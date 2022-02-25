import mongoose from 'mongoose'
const TareaSchema = mongoose.Schema({
    nombre:{
        type:String, 
        required:true, 
        trim:true 
    },

    proyecto:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'proyectos'
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'usuarios'


    }, 
    creado:{
        type:Date, 
        default:Date.now()
    },
    estado:{
        type: Boolean,
        default: false 
    }


})

module.exports = mongoose.model('tareas', TareaSchema)