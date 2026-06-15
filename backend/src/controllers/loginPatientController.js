import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";
import patientsModel from "../models/patients.js";

//Array de funciones
const loginPatientsController = {}

//login 
loginPatientsController.login = async (req, res) => {
    try {
        //Solicitar los datos
        const {
            email, 
            password
        } = req.body;

        //Verificamos si el correo existe en la base de datos
        const patientFound = await patientsModel.findOne({email})

        //Si no existe el correo
        if(!patientFound){
            return res.status(400).json({message: "Patient not found"})
        }

        //Verificamos que al cadena no este bloqueada
        if(patientFound.timeOut && patientFound.timeOut > Date.now){
            return res.status(403).json({message: "Blocked account"})
        }

        //Validar contraseña
        const isMatch = await bcrypt.compare(password, patientFound.password)

        //Si la contraseña esta incorrecta
        if(!isMatch){
            patientFound.loginAttempts = (patientFound.loginAttempts || 0) + 1;

            if (patientFound.loginAttempts >= 5){
                patientFound.timeOut = Date.now() + 5 * 60 * 1000
                patientFound.loginAttempts = 0;

                await patientFound.save();

                return res.status(403).json({message: "Blocked account for many attemps"});
            }

            await patientFound.save();

            return res.status(401).json({message: "Wrong password"});
            
        }

        //Reseteamos
        patientFound.loginAttempts = 0
        patientFound.timeOut = null

        //Generar el token 
        const token = jsonwebtoken.sign(
            {id:patientFound._id, },
            config.JWT.secret,
            {expiresIn: "30d"}
        );

        res.cookie("authCookie", token)     
        return res.status(200).json({message: "Login succesfully"});
    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"});
    }
}

export default loginPatientsController;