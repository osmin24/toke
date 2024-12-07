const {request,response} = require('express')
const Inventario = require('../models/inventario')
const Usuario = require('../models/usuario')
const EstadoEquipo = require('../models/estadoequito')
const Marca = require('../models/marcar')
const TipoEquipo = require('../models/tipoequipo')
const {validationResult} = require('express-validator')


const postInventario = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
           return res.status(400).json({msg:'Error ckeck'+error.array()})
        }

        const {} = req.body
        const inventario = await Inventario.findOne({})

        if(inventario){
            return res.status(400).json({msg:'Inventario ya registrado'})
        }

        const data = {}
        const inventarioBD = new Inventario(data)

        inventarioBD.save()
        return res.status(201).json(inventarioBD)

    }catch(e){
        return res.status(500).json({msg:'Error servidor: '+e})
    }
}

const getinventarios = async (req=request,res=response)=>{
    try{
        const inventarios = await Inventario.find()
        if(!inventarios){
            return res.status(400).json({msg:'No existe Inventario'})
        }
        return res.status(203).json(inventarios)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const getInventario = async (req=request,res=response) => {
    try{
        const {_id} = req.body
        const inventario = await Inventario.findOne({_id})
        if(!inventario){
            return res.status(400).json({msg:'No existe Inventario'})
        }
        //const {name,rol,password,email} = Inventario
        return res.status(203).json(inventario)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const deleteInventario = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
            return res.status(400).json({msg:"Error ckeck cliente: "+error})
        }
        const {_id} = req.body
        const inventarioDelete = await Inventario.findByIdAndDelete({_id})
        if(!inventarioDelete){
            return res.status(400).json({msg:'Error de cliente, Inventario no registrado'})
        }
        return res.status(204).json(inventarioDelete)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}
module.exports = {
    postInventario,
    getinventarios,
    getInventario,
    deleteInventario,
}