const router = require('express').Router()
const {check} = require('express-validator')
const {
    postUsuario,
    getUsuarios,
    getUsuario
} = require('../controllers/usuario')

router.post('/',[
    check('name','invalido name').not().isEmpty(),
    check('status','invalido status').isIn('Activo','Inactivo'),
    check('email','invalido email').isEmail(),
    check('password','invalido password').not().isEmpty(),
    check('rol','invalido rol').isIn('Administrador','Docente')
],postUsuario)
router.get('/',getUsuarios)
router.get('/',getUsuario)

module.exports = router