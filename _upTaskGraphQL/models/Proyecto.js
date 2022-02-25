import mongoose from 'mongoose'

const ProyectoSchema =  mongoose.Schema({
    nombre:{
        type:String, 
        required:true, 
        trim:true 
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'usuarios'


    }, 
    creado:{
        type:Date, 
        default:Date.now()
    }
})

module.exports = mongoose.model('proyectos', ProyectoSchema) ; 