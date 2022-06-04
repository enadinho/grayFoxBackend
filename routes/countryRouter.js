const controller = require('../controllers/countryController.js')

const router = require('express').Router()

router.get('/allCountries', controller.getAllCountrys)
router.get('/getCountry/:id', controller.getCountry)

module.exports = router
