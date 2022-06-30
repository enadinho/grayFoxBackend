const { regexpToText } = require('nodemon/lib/utils')
const { Sequelize } = require('../models')
const db = require('../models')
const { getPagination, getPagingData } = require('./sequalizeUtility')

const Cast = db.user
const Employee = db.employee


const addCast = async(req, res) =>{
    let info ={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        national: req.body.national,
        mobile: req.body.mobile,
        bodytype: req.body.bodytype,
        mobile: req.body.mobile,
        city: req.body.city,
        talent: req.body.talent,
        height: req.body.height,
        weight: req.body.weight,
        workshops: req.body.workshops,
        gender: req.body.gender,
        image: req.body.image,
        experience: req.body.experience,
        birthday: req.body.birthday,
        email: req.body.email,
        status: "pending",
        isActive: req.body.isActive ? req.body.isActive : false
    }

    const cast = await Cast.create(info)
    res.status(200).send(cast)
}


const getAllCasts = async (req, res) =>{
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    await Cast.findAndCountAll({
        limit: limit, 
        offset: offset,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving casts."
        });
    });
}


const getAllStatusPendingCasts = async (req, res) =>{
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    await Cast.findAndCountAll({
        limit: limit, 
        offset: offset,
        where:  Sequelize.literal(`status='pending'`),
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving casts."
        });
    });
}

const getAllStatusAcceptedCasts = async (req, res) =>{
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    await Cast.findAndCountAll({
        limit: limit, 
        offset: offset,
        where:  Sequelize.literal(`status='accepted'`),
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    }).then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving casts."
        });
    });
}


const getCast = async (req,res) =>{
    let id = req.params.id
    let cast = await Cast.findOne({where: {id: id}})
    res.status(200).send(cast)
}

const updateCast = async (req,res) =>{
    let id = req.params.id
    
    const cast = await Cast.update(req.body, {where: {id: id}})
    res.status(200).send(cast)
}


const deleteCast = async (req,res) =>{
    let id = req.params.id
    await Cast.destroy({where: {id: id}})
    res.status(200).send('cast deleted.')
}

const getActiveCast = async (req,res) =>{
    const casts = await Cast.findAll({where:{isActive: true}})
    res.status(200).send(casts)
}

module.exports ={
    addCast,
    getAllCasts,
    getAllStatusPendingCasts,
    getAllStatusAcceptedCasts,
    getCast,
    updateCast,
    deleteCast,
    getActiveCast
}