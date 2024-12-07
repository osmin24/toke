const router = require('express').Router()
const {check} = require('express-validator')
const {
    postEstadoEquipo,
    getEstadoEquipos,
    getEstadoEquipo,
    deleteEstadoEquipo,
} = require('../controllers/estadoequito')

router.post('/',[
    check('name','invalido name').not().isEmpty(),
    check('status','invalido status').isIn(['Activo','Inactivo']),
],postEstadoEquipo)
router.get('/',getEstadoEquipos)
router.get('/id',getEstadoEquipo)
router.delete('/',[
    check('_id','invalido id').not().isEmpty()
],deleteEstadoEquipo)

module.exports = router