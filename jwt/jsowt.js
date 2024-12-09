const jwt = require('jsonwebtoken')

const generarJ = (usuario) => {
    const payload = {
        _id:usuario._id,
        name:usuario.name,
        status:usuario.status,
        password:usuario.password,
        rol:usuario.rol,
        email:usuario.email
    }

    const jwtusuario = jwt.sign(payload,'123456',{expiresIn:'2h'})
    return jwtusuario
}

module.exports = {generarJ}