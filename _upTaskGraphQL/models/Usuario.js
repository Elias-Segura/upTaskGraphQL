import mongoose from 'mongoose'
const UsuarioSchema = mongoose.Schema({
    nombre:{
        type:String, 
        required:true, 
        trim:true 
    },
    email:{
        type:String,  
        required:true, 
        trim:true, 
        unique: true, 
        lowercase:true 
    }, 
    password:{
        type:String,  
        required:true, 
        trim:true
    }, 
    registro:{
        type: Date, 
        default: Date.now() 
    }


})

module.exports = mongoose.model('usuarios', UsuarioSchema)