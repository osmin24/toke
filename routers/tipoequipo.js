const router = require('express').Router()
const {check} = require('express-validator')
const {
    postTipoEquipo,
    gettipoEquipos,
    getTipoEquipo,
    deleteTipoEquipo,
} = require('../controllers/tipoequipo')

router.post('/',[
    check('name','invalido name').not().isEmpty(),
    check('status','invalido status').isIn(['Activo','Inactivo']),
],postTipoEquipo)
router.get('/',gettipoEquipos)
router.get('/id',getTipoEquipo)
router.delete('/',[
    check('_id','invalido id').not().isEmpty()
],deleteTipoEquipo)

module.exports = router