const {request,response} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const usuario = require('../models/usuario')

const postUsuario = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
           return res.status(400).json({msg:'Error ckeck'+error.array()})
        }

        const {name,password,email,rol,status} = req.body
        const usuario = await Usuario.findOne({email})

        if(usuario){
            return res.status(400).json({msg:'Usuario ya registrado'})
        }
        
        const sal = await bcryptjs.genSalt()
        const passwordCript = await bcryptjs.hash(password,sal)

        const data = {name,password:passwordCript,email,rol,status}
        const usuarioBD = new Usuario(data)

        usuarioBD.save()
        return res.status(201).json(usuarioBD)

    }catch(e){
        return res.status(500).json({msg:'Error servidor: '+e})
    }
}

const getUsuarios = async (req=request,res=response)=>{
    try{
        const usuarios = await Usuario.find()
        if(!usuarios){
            return res.status(400).json({msg:'No existe usuario'})
        }
        return res.status(203).json(usuarios)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const getUsuario = async (req=request,res=response) => {
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
    postUsuario,
    getUsuarios,
    getUsuario,
    deleteUsuario,
}