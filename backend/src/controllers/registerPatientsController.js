import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import patientsModel from "../models/patients.js";

import { config } from "../../config.js";
import { register } from "module";
import { error } from "console";

//Array de funciones
const registerPatientController = {};

registerPatientController.register = async (req, res) => {
    try {
        const{
                name,
                lastName,
                email,
                password,
                birthDate,
                phone,
                address,
                phoneEmergencyContacts, 
                profilePhoto,
                isVerified,
                loginAttempts,
                timeOut
        } = req.body

          //Validar si el correo existe en la base
        const existsPatient = await patientsModel.findOne({email});
        if(existsPatient){
            return res.status(400).json({message: "Patient already exists"})
        }

        //encriptar la contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //Generar el codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

      

        const newPatient = new patientsModel({
                name,
                lastName,
                email,
                password: passwordHashed,
                birthDate,
                phone,
                address,
                phoneEmergencyContacts,
                profilePhoto: req.file.path,
                public_id: req.file.filename,
                isVerified,
                loginAttempts,
                timeOut
        });

        //Guardamos todo en el token
        const token = jsonwebtoken.sign(
            {
                randomCode,
                newPatient
            },
            //Secret key
            config.JWT.secret,
            //Cuando expira
            {expiresIn: "15m"}
        );

        //Guardamos el token en un cookie
        res.cookie("registrationCookie", token,{maxAge: 15*60*1000})

        //Enviar correo electronico
        //Transporter ¿Quién lo envia?
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            },
        });

        //Quien lo recibe y como
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar la cuenta, utiliza este código " + randomCode + " expira en 15 minutos"
        }

        //Enviar el correo 
        Transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error);
                return res.status(200).json({message: "Error sending email"});
            }
            return res.status(200).json({message: "email sent"})
        });

      
         
    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"});
    }
}