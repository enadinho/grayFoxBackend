const castController = require('../controllers/userController.js')

const router = require('express').Router()

router.post('/addCast', castController.addCast)
router.get('/allCasts', castController.getAllCasts)
router.get('/getCast/:id', castController.getCast)
router.get('/activeCast', castController.getActiveCast)
router.put('/updateCast/:id', castController.updateCast)
router.delete('/deleteCast/:id', castController.deleteCast)

module.exports = router
