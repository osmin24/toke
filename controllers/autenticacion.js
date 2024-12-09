const {request,response} = require('express')
const Usuario = require('../models/usuario')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const {generarJ} = require('../jwt/jsowt')

const postAutenticacion = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
           return res.status(400).json({msg:'Error ckeck'+error.array()})
        }

        const {_id} = req.body
        const usuario = await Usuario.findOne({_id})
        if(usuario.status === 'Activo'){
            return res.status(400).json({msg:'Usuario ya autenticado'})
        }
        const igual = bcryptjs.compareSync(req.body.password,usuario.password)
        if(!igual){
            return res.status(400).json({msg:'Erro de cliente'})
        }


        usuario.status = 'Activio'
        const usuarioAut = await Usuario.findByIdAndUpdate(_id,{status:usuario.status},{new:true})
        const toke = generarJ(usuario)

        const {name,password,email,rol,status} = usuarioAut
        const usuarioToke = {name,password,email,rol,status, accesotoke:toke}
        return res.status(201).json(usuarioToke)
        
    }catch(e){
        return res.status(500).json({msg:'Error servidor: '+e})
    }
}

const getAutenticacions = async (req=request,res=response)=>{
    try{
        const {status} = req.body
        const usuarios = await Usuario.find({status})
        if(!usuarios){
            return res.status(400).json({msg:'No existe usuario autenticado'})
        }
        return res.status(203).json(usuarios)
    }catch(e){
        console.info(e)
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const getAutenticacion = async (req=request,res=response) => {
    try{
        const {_id} = req.body
        const usuario = await Usuario.findOne({_id})
        if(!usuario){
            return res.status(400).json({msg:'No existe usuario'})
        }
        //const {name,rol,password,email} = usuario
        return res.status(203).json(usuario)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const deleteUsuario = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
            return res.status(400).json({msg:"Error ckeck cliente: "+error})
        }
        const {_id} = req.body
        const usuarioDelete = await Usuario.findByIdAndDelete({_id})
        if(!usuarioDelete){
            return res.status(400).json({msg:'Error de cliente, usuario no registrado'})
        }
        return res.status(204).json(usuarioDelete)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}
module.exports = {
    postAutenticacion,
    getAutenticacions,
    getAutenticacion
}