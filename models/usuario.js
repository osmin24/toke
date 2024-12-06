const {Schema,model} = require('mongoose')

const SchemaUsuario = Schema({
    name:{
        type:String,
        required:[true],
        default:''
    },
    status:{
        type:String,
        required:[true,'Activo','Inactivo'],
        enum:['Activo','Inactivo']
    },
    email:{
        type:String,
        required:[true],
        unique:true,
        default:'gmail'
    },
    password:{
        type:String,
        required:[true]
    },
    rol:{
        type:String,
        required:[true,'Administrador','Docente'],
        enum:['Administrador','Docente'],
        default:''
    },
    createDate:{
        type:Date,
        default: new Date()
    },
    updateDate:{
        type:Date,
        default: new Date()
    }
})


module.exports = model('Usuario',SchemaUsuario)