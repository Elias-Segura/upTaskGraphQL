import {ApolloServer} from 'apollo-server'
import {typeDefs} from './db/schema'
import {resolvers} from './db/resolvers'
import {conectarDB} from './config/db'
import dotenv from 'dotenv'

dotenv.config({path:'variables.env'}); 
const jwt = require('jsonwebtoken')
conectarDB(); 
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context:({req})=>{
        const token = req.headers['authorization'] || ''

        if(token){
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA)
               
                return {
                    usuario 
                }
            } catch (error) {
                
            }
        }else{
            return{
                usuario:null 
            }
        }
    }
});


server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log('running on ', url )
})