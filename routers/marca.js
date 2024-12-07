const router = require('express').Router()
const {check} = require('express-validator')
const {
    postMarca,
    getMarcas,
    getMarca,
    deleteMarca
} = require('../controllers/marca')

router.post('/',[
    check('name','invalido name').not().isEmpty(),
    check('status','invalido status').isIn(['Activo','Inactivo']),
],postMarca)
router.get('/',getMarcas)
router.get('/id',getMarca)
router.delete('/',[
    check('_id','invalido id').not().isEmpty()
],deleteMarca)

module.exports = router