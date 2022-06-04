const db = require('../models')

const Country = db.country


const getAllCountrys = async (req, res) =>{
    let countries = await Country.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] }
    })
    console.log(countries)
    res.status(200).send(countries)
}


const getCountry = async (req,res) =>{
    let id = req.params.id
    let country = await Country.findOne({where: {id: id}})
    res.status(200).send(country)
}


module.exports ={
    getAllCountrys,
    getCountry
}