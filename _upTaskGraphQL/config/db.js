import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path:'variables.env'}); 

export const conectarDB = async ()=>{

    try {
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser:true, 
            useUnifiedTopology:true, 
            useFindAndModify:false,
            useCreateIndex: true 
        } )

        console.log('DB conectada.')
    } catch (error) {
        
    }

}

