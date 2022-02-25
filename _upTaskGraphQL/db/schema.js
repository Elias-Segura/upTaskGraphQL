import { gql } from 'apollo-server'


const typeDefs = gql`
    type Token{
        token:String 
    }
    type Tarea{
        id:ID, 
        nombre:String, 
        creador:Usuario 
        creado:String 
        proyecto:Proyecto 
        estado:Boolean 
    }
    type Usuario{
        id:ID 
        nombre:String, 
        email:String,
        registro:String

    }
    type Proyecto{
        id:ID
        nombre:String
        creador: Usuario  
        creado: String
    }
    type Curso{
        titulo:String 
    }
    type Query {
        obtenerUsuarioAutenticado: Usuario 
        obtenerProyectos: [Proyecto]
        obtenerTareas(id:ID!): [Tarea]
    }

    input TareaInput{      
        nombre:String, 
        proyecto:ID, 
        estado:Boolean 
    }
    input UsuarioInput{
        nombre:String!, 
        password:String!, 
        email:String!
    }
    input autenticarInput{
        password:String!, 
        email:String!
    }
    input ProyectoInput{
        nombre:String!
    }
    type Mutation{
        nuevaTarea(input: TareaInput): Tarea  
        actualizarTarea(id:ID!, input: TareaInput): Tarea
        eliminarTarea(id:ID): String 


        crearUsuario(input: UsuarioInput): String 
        autenticarUsuario(input: autenticarInput):Token 
        nuevoProyecto(input:ProyectoInput): Proyecto 
        actualizarProyecto(id:ID!, input:ProyectoInput):Proyecto 
        eliminarProyecto(id:ID!):String 
    }

`


export { typeDefs }