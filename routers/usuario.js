const router = require('express').Router()
const {check} = require('express-validator')
const {
    postUsuario,
    getUsuarios,
    getUsuario,
    deleteUsuario
} = require('../controllers/usuario')

router.post('/',[
    check('name','invalido name').not().isEmpty(),
    check('status','invalido status').isIn(['Activo','Inactivo']),
    check('email','invalido email').isEmail(),
    check('password','invalido password').not().isEmpty(),
    check('rol','invalido rol').isIn(['Administrador','Docente'])
],postUsuario)
router.get('/',getUsuarios)
router.get('/id',getUsuario)
router.delete('/',[
    check('_id','invalido id').not().isEmpty()
],deleteUsuario)

module.exports = router