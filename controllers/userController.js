const db = require('../models')

const Cast = db.user
const Employee = db.employee


const addCast = async(req, res) =>{
    let info ={
        name: req.body.name,
        national: req.body.national,
        mobile: req.body.mobile,
        city: req.body.city,
        talent: req.body.talent,
        height: req.body.height,
        width: req.body.width,
        gender: req.body.gender,
        image: req.body.image,
        photo_session: req.body.photo_session,
        field_19: req.body.field_19,
        isActive: req.body.isActive ? req.body.isActive : false
    }

    const cast = await Cast.create(info)
    res.status(200).send(cast)
}


const getAllCasts = async (req, res) =>{
    let casts = await Cast.findAll({})
    res.status(200).send(casts)
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
    getCast,
    updateCast,
    deleteCast,
    getActiveCast
}