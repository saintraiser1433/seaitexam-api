const { sequelize, Question, Choices, Exam } = require("../db/models");
const questionUseCase = require("../use-cases/question-use-case");
const choiceUseCase = require("../use-cases/choice-use-case");
const getAllQuestions = async (req, res) => {
  try {
    const result = await Question.findAll({
      include: [
        {
          model: Exam,
          attributes: ["exam_title"],
        },
      ],
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }
    res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const getAllQuestionById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Question.findByPk(id, {
      include: [
        {
          model: Exam,
          attributes: ["exam_title"],
        },
      ],
    });
    if (!result) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const insertQuestionChoices = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const { question, exam_id, choices } = req.body;
      const questBody = {
        question: question,
        exam_id: exam_id,
      };

      const questData = await questionUseCase.insert(questBody);

      const questionRecord = await Question.create(questData, {
        transaction: t,
      });
      const choiceData = choices.map((choice) => ({
        description: choice.description,
        question_id: questionRecord.question_id,
        status: choice.status,
      }));

      const validatedChoices = await choiceUseCase.insert(choiceData);

      await Choices.bulkCreate(validatedChoices, {
        transaction: t,
      });

      const insertedQuestion = await Question.findByPk(
        questionRecord.question_id,
        {
          transaction: t,
        }
      );
      // const result = {
      //   question_id: questionRecord.question_id,
      //   question: questionRecord.question,
      //   exam_id: questionRecord.exam_id,
      //   choices: createdChoices,
      // };

      return res.status(201).json({
        status: "Success",
        message: "Succesfully inserted",
        data: insertedQuestion,
      });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const updateQuestionChoices = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const { question, question_id, choices } = req.body;

      // Update the question
      const quest = {
        question: question,
        question_id: question_id,
      };
      const questData = await questionUseCase.update(quest);

      await Question.update(questData, {
        where: { question_id: question_id },
        transaction: t,
      });

      // Find all existing choices for the question
      const existingChoices = await Choices.findAll({
        where: { question_id: question_id },
        transaction: t,
      });

      // Get the ids of incoming choices from the request body
      const incomingChoiceIds = choices.map((choice) => choice.choices_id);

      // Delete the choices that do not exist in the incoming choices
      const choicesToDelete = existingChoices.filter(
        (existingChoice) =>
          !incomingChoiceIds.includes(existingChoice.choices_id)
      );

      for (const choiceToDelete of choicesToDelete) {
        await Choices.destroy({
          where: { choices_id: choiceToDelete.choices_id },
          transaction: t,
        });
      }

      for (const choice of choices) {
        const validatedChoice = await choiceUseCase.update(choice);

        const existingChoice = existingChoices.find(
          (item) => item.choices_id === choice.choices_id
        );

        if (existingChoice) {
          await Choices.update(validatedChoice, {
            where: { choices_id: validatedChoice.choices_id },
            transaction: t,
          });
        } else {
          await Choices.create(
            { ...validatedChoice, question_id },
            { transaction: t }
          );
        }
      }
      const updatedQuestion = await Question.findByPk(question_id, {
        transaction: t,
      });

      return res.status(201).json({
        status: "Success",
        message: "Successfully updated",
        data: updatedQuestion,
      });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRowCount = await Question.destroy({
      where: {
        question_id: id,
      },
    });
    if (deleteRowCount === 0) {
      return res
        .status(404)
        .json({ message: "Question not found, no deletion has been made" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQuestions,
  getAllQuestionById,
  insertQuestionChoices,
  updateQuestionChoices,
  deleteQuestion,
};
