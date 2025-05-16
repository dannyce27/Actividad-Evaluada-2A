import {Schema, model} from "mongoose"

const moviesSchema = new Schema ({

    titulo: {
        type: String,
        require: true,
    },
    descripcion:{
        type: String,
        require: true,
    },
    director: {
        type: String,
        require: true,
    },
    genero: {
        type: String, 
        require: true,
    },
    anio: {
        type: Number,
        require: true,
    },
    duracion: {
        type: Number, 
        require: true,

    },
    imagen: {
        type: String,
        require: true,
    }
    
}, {
    timestamps: true,
    strict: false, 
})
   
export default model("movies", moviesSchema)
