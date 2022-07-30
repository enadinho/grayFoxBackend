const { regexpToText } = require('nodemon/lib/utils')
const { Sequelize } = require('../models')
const db = require('../models')
const { getPagination, getPagingData, getPagingAndFilteredData } = require('./sequalizeUtility')
const path = require("path");
const { Op } = require('sequelize');

const Cast = db.user
const Employee = db.employee


const addCast = async(req, res) => {
    let info = {
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

const getAllCastsWithFilters = async (req, res) =>{
    const { page, size } = req.query;
    const filters=req.body;
    let statement="";
    filters.forEach(filter => {
        console.log(filter.key+":"+filter.value)
        statement=statement + `${filter.key}='${filter.value}'`+",";
    });
    statement=statement.substring(0, statement.length-1);
    console.log(statement)
    const { limit, offset } = getPagination(page, size);
    await Cast.findAndCountAll({
        limit: limit, 
        offset: offset,
        where: Sequelize.literal(statement),
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



const getCastSearchParams = async (req, res) =>{
    console.log(req.query);

    let searchKey=Object.keys(req.query)[0];
    let searhValue=Object.values(req.query)[0];
    const { page, size } = req.query;
    
    let statement="";
    if(Object.keys(req.query).length>2)
      statement=`${searchKey} like '%${searhValue}%'`;

    console.log(statement)
    const { limit, offset } = getPagination(page, size);
    await Cast.findAndCountAll({
        limit: limit, 
        offset: offset,
        where: Sequelize.literal(statement),
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    }).then(data => {
        const response = getPagingAndFilteredData(data, page, limit);
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

const getProfileImage = async (req, res) =>{
    let id = req.params.id;
    // let cast = await Cast.findOne({where: {id: id}})
    // console.log(`${__dirname}`);
    return res.sendFile(path.join(`${__dirname}/../resources/static/img/profiles/` + id+".jpg"));
}

const updateCast = async (req,res) =>{
    let id = req.params.id
    const cast = await Cast.update(req.body, {where: {id: id}})
    res.status(200).send(cast)
}

const patchCast = async (req,res) =>{
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

const uploadProfileImage = async (req, res) => {
    console.log(req)
    try {
      console.log(req.file);
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }
      Image.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(
          __basedir + "/resources/static/assets/uploads/" + req.file.filename
        ),
      }).then((image) => {
        fs.writeFileSync(
          __basedir + "/resources/static/assets/tmp/" + image.name,
          image.data
        );
        return res.send(`File has been uploaded.`);
      });
    } catch (error) {
      console.log(error);
      return res.send(`Error when trying upload images: ${error}`);
    }
  }

module.exports ={
    addCast,
    getAllCasts,
    getAllCastsWithFilters,
    getCastSearchParams,
    getAllStatusPendingCasts,
    getAllStatusAcceptedCasts,
    getCast,
    updateCast,
    deleteCast,
    getActiveCast,
    getProfileImage,
    uploadProfileImage
}