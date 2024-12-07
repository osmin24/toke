const {request,response} = require('express')
const EstadoEquipo = require('../models/estadoequito')
const {validationResult} = require('express-validator')

const postEstadoEquipo = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
           return res.status(400).json({msg:'Error ckeck'+error.array()})
        }

        const {name,status} = req.body
        const estadoequipo = await EstadoEquipo.findOne({name})

        if(estadoequipo){
            return res.status(400).json({msg:'Estado Equipo ya registrado'})
        }

        const data = {name,status}
        const estadoEquipoBD = new EstadoEquipo(data)

        estadoEquipoBD.save()
        return res.status(201).json(estadoEquipoBD)

    }catch(e){
        return res.status(500).json({msg:'Error servidor: '+e})
    }
}

const getEstadoEquipos = async (req=request,res=response)=>{
    try{
        const estadoEquipos = await EstadoEquipo.find()
        if(!estadoEquipos){
            return res.status(400).json({msg:'No existe EstadoEquipo'})
        }
        return res.status(203).json(estadoEquipos)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const getEstadoEquipo = async (req=request,res=response) => {
    try{
        const {_id} = req.body
        const estadoEquipo = await EstadoEquipo.findOne({_id})
        if(!estadoEquipo){
            return res.status(400).json({msg:'No existe EstadoEquipo'})
        }
        //const {name,rol,password,email} = EstadoEquipo
        return res.status(203).json(estadoEquipo)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const deleteEstadoEquipo = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
            return res.status(400).json({msg:"Error ckeck cliente: "+error})
        }
        const {_id} = req.body
        const estadoEquipoDelete = await EstadoEquipo.findByIdAndDelete({_id})
        if(!estadoEquipoDelete){
            return res.status(400).json({msg:'Error de cliente, EstadoEquipo no registrado'})
        }
        return res.status(204).json(estadoEquipoDelete)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}
module.exports = {
    postEstadoEquipo,
    getEstadoEquipos,
    getEstadoEquipo,
    deleteEstadoEquipo,
}