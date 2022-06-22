const bcrypt = require('bcryptjs/dist/bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { user } = require('../models');
const db = require('../models')

const Employee = db.employee

var signOptions = {
  issuer:  'i',
  subject:  's',
  audience:  'a',
  expiresIn:  "12h",
  algorithm:  "HS256"
 };

const login = async (req, res)=> {
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(email)
    
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const employee = await Employee.findOne({ 
      where: {email: email},
      attributes: { exclude: ['token'] },
    });

    if(!employee){
        res.status(400).send("Employee not found, Please Register"); 
    }
    else if (employee && (await bcrypt.compare(password, employee.password))) {
      // Create token
      const token = jsonwebtoken.sign(
        { userid: employee.id, username: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_KEY_EXPIRY,
        },
        signOptions
      );

      // save user token
      // employee.token = token;
      Employee.update({token: token}, { where:{ id : employee.id } })
      // user
      req.session.token = token;
      res.status(200).json(employee);
    }
    else{
        res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Server Error" });
  }
}

const profile = async (req, res) => {
  try {
      console.log(req.user);
      const employee = await Employee.findOne({ 
        where: {email: req.user.username},
        attributes: { exclude: ['token', 'password'] },
       });
      return res.status(200).send(employee);
  } catch (err) {
   console.log(err);
  }
}


const logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
}


const register = async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Employee.findOne({ where: {email: email} });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const employee = await Employee.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jsonwebtoken.sign(
      { user_id: employee._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_KEY_EXPIRY,
      }
    );
    // save user token
    employee.token = token;

    // return new user
    res.status(201).json(employee);
  } catch (err) {
    console.log(err);
  }
}

const addEmployee = async(req, res) =>{
    let info ={
        name: req.body.name,
    }
    const employee = await Employee.create(info)
    res.status(200).send(employee)
}


const getAllEmployees = async (req, res) =>{
    let employees = await Employee.findAll({
      attributes: { exclude: ['token', 'password']}
    })
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
    login,
    profile,
    logout,
    register,
    addEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
}