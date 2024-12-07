const {Schema,model} = require('mongoose')

const SchemaInventario = Schema({
    serial:{
        Types:Number,
        required:[true],
        unique:true,
        default:''
    },
    modelo:{
        Types:String,
        required:[true]
    },
    descripcion:{
        Types:String,
        required:true
    },
    foto:{
        Types:String,
        required:[true]
    },
    color:{
        Types:String,
        required:[true]
    },
    dateCompra:{
        Types:Date,
        required:[true]
        
    },
    precio:{
        Types:Number,
        rquired:[true],
        default:0.0
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true]
    },
    marca:{
        type:Schema.Types.ObjectId,
        ref:'Marca',
        required:[true]
    },
    tipoEquipo:{
        type:Schema.Types.ObjectId,
        ref:'TipoEquipo',
        required:[true]
    },
    EstadoEquipo:{
        type:Schema.Types.ObjectId,
        ref:'EstadoEquipo',
        required:[true]
    }
})



module.exports = model('Inventario',SchemaInventario)