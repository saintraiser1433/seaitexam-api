const {Router} = require('express');
const examinee = require('../controllers/examineeController')
const route = Router();

route.get('/',examinee.getAllExaminee);
route.get('/:id',examinee.getExamineeById);
route.post('/',examinee.insertExaminee);
route.patch('/:id',examinee.updateExaminee);
route.delete('/:id',examinee.deleteExaminee);


module.exports = route;

