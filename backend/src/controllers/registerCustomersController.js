//Importamos todas las librerias
import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar
import nodemailer from "nodemailer"; // Enviar correos
import crypto from "crypto"; //Generar código

import clientsModel from "../models/customers.js";
import { config } from "../config.js";


// Array de funciones
const registerClientController = {};

registerClientController.registerClient = async (req, res) => {
    // 1- Pedimos las cosas que vamos a guardar
    const {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        DUI,
    } = req.body;

    try {
        // Varificar si el cliente ya existe
        const existClient = await clientsModel.findOne({ correo });
        if (existClient) {
            return res.json({ message: "Client already exists" });
        }

        // Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(contrasenia, 10);

        // Guardamos en la base de datos
        const newClient = new clientsModel({
            nombre,
            correo,
            constrasenia: passwordHash,
            telefono,
            direccion,
            DUI: DUI || null,
        });


        await newClient.save();

        // Genearar un codigo de verificacion
        const verficationCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas

        // TOKEN
        const tokenCode = jsonwebtoken.sign(
            {
                //1- ¿que vamos a guardar?
                correo,
                verficationCode,
                expiresAt,
            },
            //2- secreto
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn }

        );

        // Guardar el token en una cookie
        res.cookie("verificationToken", tokenCode, {
            maxAge: 2 * 60 * 60 * 1000, // Duración de la cookie: 2 horas
        });

        // Enviar correo
        // 1- Transporter:  ¿Desde donde voy a enviar el correo?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.pass,
            },
        });

        const mailOptions = {
            from: config.email.user,
            to: correo,  
            subject: "Verificacion de correo",
            text: `Para verificar que eres dueño de la cuenta, utiliza este codigo ${verficationCode}\n Este codigo expira en dos horas\n`,
        };

        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error: " + error);
                return res.status(500).json({ message: "Error sending email" });
            }
            // Solo responde aquí cuando el correo se envía bien
            return res.json({ message: "Client registered, Please verify your email" });
        });
    } catch (error) {
        res.json({ message: "error" + error });
    }
};

registerClientController.verifyCodeEmail = async (req, res) => {
    const { verficationCode } = req.body;
    // Accedemos al token "verification token"
    // Ya que este contiene, el email, el codigo de verificacarion y cuando expira
    const token = req.cookies.verificationToken;

    if (!token) {
        return res.json({ message: "Please register your account first" });
    }

    try {
        // Verificamos y decodificamos el token
        // Para obtener el email y el codigo de verificacion
        // Que acabamos de guardar al momento de registrar
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { correo, verficationCode: storedCode } = decoded;

        // Comparar el codigo recibido con el almacenado en el token
        if (verficationCode !== storedCode) {
            return res.json({ message: "Invalid verification code" });
        }

        // busco al cliente
        const client = await clientsModel.findOne({ correo });
        if (!client) {
            return res.json({ message: "Client not found" });
        }

        // Quitar el token con el email, codigo de verificacion y cuando expira
        res.clearCookie("verificationToken");

        res.json({ message: "Email verified successfully" });
    } catch (error) {
        res.json({ message: "error" + error });
    }
};

export default registerClientController;
