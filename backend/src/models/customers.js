import {Schema, model} from "mongoose"

const customersSchema = new Schema ({

    nombre: {
        type: String,
        require: true,
    },
    correo:{
        type: String,
        require: true,
    },
    constrasenia: {
        type: String,
        require: true,
    },
    telefono: {
        type: String, 
        require: true,
    },
    direccion: {
        type: String,
        require: true,
    },
    DUI: {
        type: String,
        require: true,
    }
    
}, {
    timestamps: true,
    strict: false, 
})
   
export default model("customers", customersSchema)
