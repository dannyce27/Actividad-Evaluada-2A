import employeeModel from "../models/employees.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
    const {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI,
    } = req.body;

    try {
        const existEmployee = await employeeModel.findOne({ correo });
        if (existEmployee) {
            return res.json({ message: "Employee already exists" });
        }

        const passwordHash = await bcryptjs.hash(contrasenia, 10);

        const newEmployee = new employeeModel({
            nombre,
            correo,
            contrasenia: passwordHash,
            telefono,
            direccion,
            puesto,
            fecha_contratacion,
            salario,
            DUI,
        });

        await newEmployee.save();

        jsonwebtoken.sign(
            { id: newEmployee._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) {
                    console.log("JWT error: " + error);
                    return res.status(500).json({ message: "Error generating token" });
                }

                res.cookie("authToken", token);
                res.json({ message: "Employee saved" });
            }
        );
    } catch (error) {
        console.log("Error saving employee: " + error);
        res.status(500).json({ message: "Error saving employee" });
    }
};

export default registerEmployeesController;
