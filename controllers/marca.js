const {request,response} = require('express')
const Marca = require('../models/marcar')
const {validationResult} = require('express-validator')

const postMarca = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
           return res.status(400).json({msg:'Error ckeck'+error.array()})
        }

        const {name,status} = req.body
        const marca = await Marca.findOne({name})

        if(marca){
            return res.status(400).json({msg:'Marca ya registrado'})
        }

        const data = {name,status}
        const marcaBD = new Marca(data)

        marcaBD.save()
        return res.status(201).json(marcaBD)

    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Error servidor: '+e})
    }
}

const getMarcas = async (req=request,res=response)=>{
    try{
        const marcas = await Marca.find()
        if(!marcas){
            return res.status(400).json({msg:'No existe Marca'})
        }
        return res.status(203).json(marcas)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const getMarca = async (req=request,res=response) => {
    try{
        const {_id} = req.body
        const marca = await Marca.findOne({_id})
        if(!marca){
            return res.status(400).json({msg:'No existe Marca'})
        }
        //const {name,rol,password,email} = Marca
        return res.status(203).json(Marca)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}

const deleteMarca = async (req=request,res=response) => {
    try{
        const error = validationResult(req)
        if(!error){
            return res.status(400).json({msg:"Error ckeck cliente: "+error})
        }
        const {_id} = req.body
        const marcaDelete = await Marca.findByIdAndDelete({_id})
        if(!marcaDelete){
            return res.status(400).json({msg:'Error de cliente, Marca no registrado'})
        }
        return res.status(204).json(marcaDelete)
    }catch(e){
        return res.status(500).json({msg:'ERROR SERVIDOR:'+e})
    }
}
module.exports = {
    postMarca,
    getMarcas,
    getMarca,
    deleteMarca,
}