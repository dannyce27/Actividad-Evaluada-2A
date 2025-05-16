import {Schema, model} from "mongoose"

const employeeSchema = new Schema ({

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
    puesto: {
        type: String, 
        require: true,

    },
    fecha_contratacion: {
        type: Date,
        require: true,
    },
    salario: {
        type: Number,
        require: true
    },
    DUI: {
        type: String,
        require: true,
    },
    isVerified: {
        type: Boolean,
        require: true,
    }
    


}, {
    timestamps: true,
    strict: false, 
})
   
export default model("employees", employeeSchema)
