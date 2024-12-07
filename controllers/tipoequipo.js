const {request,response} = require('express')
const TipoEquipo = require('../models/tipoequipo')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')

const postTipoEquipo = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
           return res.status(400).json({msg:'Error ckeck'+error.array()})
        }

        const {name,status} = req.body
        const tipoEquipo = await TipoEquipo.findOne({name})

        if(tipoEquipo){
            return res.status(400).json({msg:'TipoEquipo ya registrado'})
        }

        const data = {name,status}
        const tipoEquipoBD = new TipoEquipo(data)

        tipoEquipoBD.save()
        return res.status(201).json(tipoEquipoBD)

    }catch(e){
        return res.status(500).json({msg:'Error servidor: '+e})
    }
}

const gettipoEquipos = async (req=request,res=response)=>{
    try{
        const tipoEquipos = await TipoEquipo.find()
        if(!tipoEquipos){
            return res.status(400).json({msg:'No existe TipoEquipo'})
        }
        return res.status(203).json(tipoEquipos)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const getTipoEquipo = async (req=request,res=response) => {
    try{
        const {_id} = req.body
        const tipoEquipo = await TipoEquipo.findOne({_id})
        if(!tipoEquipo){
            return res.status(400).json({msg:'No existe TipoEquipo'})
        }
        //const {name,rol,password,email} = TipoEquipo
        return res.status(203).json(tipoEquipo)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const deleteTipoEquipo = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
            return res.status(400).json({msg:"Error ckeck cliente: "+error})
        }
        const {_id} = req.body
        const tipoEquipoDelete = await TipoEquipo.findByIdAndDelete({_id})
        if(!tipoEquipoDelete){
            return res.status(400).json({msg:'Error de cliente, TipoEquipo no registrado'})
        }
        return res.status(204).json(tipoEquipoDelete)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}
module.exports = {
    postTipoEquipo,
    gettipoEquipos,
    getTipoEquipo,
    deleteTipoEquipo,
}