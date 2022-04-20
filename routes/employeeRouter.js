const employeeController = require('../controllers/employeeController.js')

const router = require('express').Router()

router.post('/addEmployee', employeeController.addEmployee)
router.get('/allEmployees', employeeController.getAllEmployees)
router.get('/getEmployee/:id', employeeController.getEmployee)
router.put('/updateEmployee/:id', employeeController.updateEmployee)
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee)

module.exports = router
