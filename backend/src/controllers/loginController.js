//Importamos los modelos
import customersModel from "../models/customers.js";
import employeesModel from "../models/employee.js";
import bcryptjs from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; // generar token
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {

    const {correo, contrasenia} = req.body;

    try {
        let userFound;
        let userType;


        if(
            correo === config.ADMIN.emailAdmin && 
            contrasenia === config.ADMIN.password
        ) {
            userType = "Admin"
            userFound = {_id: "Admin"};
        }
        else {
            userFound = await employeesModel.findOne({correo})
            userType = "Employee";

            if(!userFound) {
                userFound = await customersModel.findOne({correo});
                userType = "Customer";
            }
        }

        if(userType !== "Admin") {
            const isMatch = await bcryptjs.compare(contrasenia, userFound.contrasenia);
            if(!isMatch) {
                return res.json({message: "Invalid password"})
            }
        }

        jsonwebtoken.sign(

            {id: userFound._id, userType},

            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (error, token) => {
                if(error) console.log("Error" + error);
                res.cookie("authToken", token);
                res.json({message: "Login succesful"});
            }
        );
    } catch (error) {
        console.log("Error" + error)
    }
};

export default loginController;