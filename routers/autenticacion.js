const router = require('express').Router()
const {check} = require('express-validator')
const {
    postAutenticacion,
    getAutenticacions,
    getAutenticacion
} = require('../controllers/autenticacion')

router.post('/',[
    check('status','invalido status').isIn(['Inactivo']),
],postAutenticacion)
router.get('/',getAutenticacions)
router.get('/id',getAutenticacion)

module.exports = router