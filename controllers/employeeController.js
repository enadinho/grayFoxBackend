const db = require('../models')

const Employee = db.employee


const addEmployee = async(req, res) =>{
    let info ={
        name: req.body.name,
    }

    const employee = await Employee.create(info)
    res.status(200).send(employee)
}


const getAllEmployees = async (req, res) =>{
    let employees = await Employee.findAll({})
    res.status(200).send(employees)
}


const getEmployee = async (req,res) =>{
    let id = req.params.id
    let employee = await Employee.findOne({where: {id: id}})
    res.status(200).send(employee)
}

const updateEmployee = async (req,res) =>{
    let id = req.params.id
    
    const employee = await Employee.update(req.body, {where: {id: id}})
    res.status(200).send(employee)
}


const deleteEmployee = async (req,res) =>{
    let id = req.params.id
    await Employee.destroy({where: {id: id}})
    res.status(200).send('employee deleted.')
}


module.exports ={
    addEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
}