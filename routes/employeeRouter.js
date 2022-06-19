const employeeController = require('../controllers/employeeController.js')
const auth = require("../middleware/auth");

const router = require('express').Router()

router.post('/login', employeeController.login)
router.get('/profile', auth, employeeController.profile)
router.post('/register', employeeController.register)
router.get('/allEmployees', auth, employeeController.getAllEmployees)
router.get('/getEmployee/:id', auth, employeeController.getEmployee)
router.put('/updateEmployee/:id', auth, employeeController.updateEmployee)
router.delete('/deleteEmployee/:id', auth, employeeController.deleteEmployee)

module.exports = router
