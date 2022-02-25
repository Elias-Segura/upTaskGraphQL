
import { Usuario, Proyecto, Tarea } from '../models/'
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
import dotenv from 'dotenv'

dotenv.config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {

    const { id, email, nombre } = usuario


    return jwt.sign({ id, email, nombre}, secreta, { expiresIn });







}
export const resolvers = {
    Query: {
        obtenerUsuarioAutenticado: (_, {}, ctx)=>{
            try {
                return ctx.usuario
            } catch (error) {
                
            }
        },
        obtenerProyectos: async (_, { }, ctx) => {
            const proyectos = await Proyecto.find({ creador: ctx.usuario.id })

            return proyectos;
        }, 
        obtenerTareas: async(_, {id}, ctx)=>{
           try {
            const tareas= await Tarea.find({ creador: ctx.usuario.id, proyecto:id}); 
            
            return tareas 
           } catch (error) {
               throw new Error('No se pudo obtener las tareas')
           }
        }
    },
    Mutation: {
        crearUsuario: async (_, { input }) => {
           
            const { email, password } = input
            

            const existeUsuario = await Usuario.findOne({ email });


            if (existeUsuario) {
                throw new Error('El usuario ya existe.')
            }

            try {


                const salt = await bcryptjs.genSalt(10);

                input.password = await bcryptjs.hash(password, salt);

                const nuevoUsuario = new Usuario(input);

                nuevoUsuario.save();
            } catch (error) {
                throw new Error('No se pudo crear el usuario.')
            }

            return 'El usuario se creo correctamente.'
        },
        autenticarUsuario: async (_, { input }) => {

            const { email, password } = input
          

            const existeUsuario = await Usuario.findOne({ email });

            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }


            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);

            if (!passwordCorrecto) {
                throw new Error('Contrasenna incorrecta');
            }


            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '2hr')

            }
        },
        nuevoProyecto: async (_, { input }, ctx) => {


            try {
                const proyecto = new Proyecto(input)
                proyecto.creador = ctx.usuario.id
                const resultado = await proyecto.save()
                return resultado
            } catch (error) {
               
                throw new Error('No se pudo agregar el proyecto')
            }
        },
        actualizarProyecto: async (_, { id, input }, ctx) => {


            let existeProyecto = await Proyecto.findById(id)

            if (!existeProyecto) {
                throw new Error('El proyecto no existe')
            }

            if (existeProyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('Usted no tiene los credenciales para realizar esa accion');
            }

            existeProyecto = await Proyecto.findOneAndUpdate({ _id: id, }, input, { new: true })

            return existeProyecto

        },
        eliminarProyecto: async (_, { id }, ctx) => {

            try {
                let existeProyecto = await Proyecto.findById(id)

                if (!existeProyecto) {
                    throw new Error('El proyecto no existe')
                }

                if (existeProyecto.creador.toString() !== ctx.usuario.id) {
                    throw new Error('Usted no tiene los credenciales para realizar esa accion');
                }

                await Proyecto.findOneAndDelete({ _id: id });
                return 'Proyecto eliminado'
            } catch (error) {
                throw new Error('El proyecto no existe')
            }


        },
        nuevaTarea: async (_, { input }, ctx) => {

            try {
                if (ctx.usuario.id) {
                    input.creador = ctx.usuario.id

                    const existeProyecto = await Proyecto.findById(input.proyecto); 
                    if(existeProyecto){
                        const nuevaTarea =  new Tarea(input)
                        nuevaTarea.save()
                        return nuevaTarea; 
                    }else{
                        throw new Error('No se pudo insertar esta tarea.')
                    }
                
                }
                throw new Error('Debes tener credenciales en el sistema para realizar esta accion ')

            } catch (error) {
                throw new Error('No se pudo insertar esta tarea.')

            }


        },
        actualizarTarea: async  (_, {id, input}, ctx)=>{
            let existeTarea = await Tarea.findById(id)

            if (!existeTarea) {
                throw new Error('La tarea no existe')
            }

            if (existeTarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('Usted no tiene los credenciales para realizar esa accion');
            }
            existeTarea = await Tarea.findOneAndUpdate({ _id: id, }, input, { new: true })

            return existeTarea

        },
        eliminarTarea: async (_, { id }, ctx) => {

            try {
                let existeTarea = await Tarea.findById(id)

                if (!existeTarea) {
                    throw new Error('La tarea no existe')
                }

                if (existeTarea.creador.toString() !== ctx.usuario.id) {
                    throw new Error('Usted no tiene los credenciales para realizar esa accion');
                }

                await Tarea.findOneAndDelete({ _id: id });
                return 'Tarea eliminada'
            } catch (error) {
                throw new Error('La tarea no existe')
            }


        }
    }
}
