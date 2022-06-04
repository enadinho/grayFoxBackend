const db = require('../models')

const Country = db.country
const City = db.city


const getAllCountrys = async (req, res) =>{
    let countries = await Country.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] }
    })
    res.status(200).send(countries)
}


const getCountry = async (req,res) =>{
    let id = req.params.id
    let country = await Country.findOne({where: {id: id}})
    res.status(200).send(country)
}

const getAllCitiesOfCountry = async (req, res) =>{
    let id = req.params.id
    let cities = await City.findAll({ 
        where: {country_id: id},
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] }},
        )
    res.status(200).send(cities)
}



module.exports ={
    getAllCountrys,
    getCountry,
    getAllCitiesOfCountry
}