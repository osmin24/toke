const {Schema,model} = require('mongoose')

const SchemaTipoEquipo = Schema({
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
    createDate:{
        type:Date,
        default: new Date()
    },
    updateDate:{
        type:Date,
        default: new Date()
    }
})


module.exports = model('TipoEquipo',SchemaTipoEquipo)