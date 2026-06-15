import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import patientsModel from "../models/patients.js";
import { config } from "../../config.js";

const registerPatientController = {};

registerPatientController.register = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        const existsPatient = await patientsModel.findOne({ email });
        if (existsPatient) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        const passwordHashed = await bcryptjs.hash(password, 10);
        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {
                randomCode,
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
            },
            config.JWT.secret,
            { expiresIn: "15m" }
        );

        res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            },
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar la cuenta, utiliza este código " + randomCode + " expira en 15 minutos"
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error);
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Email sent" });
        });

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

registerPatientController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;

        const token = req.cookies.registrationCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode: storedCode,
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            loginAttempts,
            timeOut
        } = decoded;

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid code" });
        }

        const newPatient = new patientsModel({
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            isVerified: true,
            loginAttempts,
            timeOut
        });

        await newPatient.save();

        res.clearCookie("registrationCookie");

        return res.status(200).json({ message: "Patient registered" });

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

export default registerPatientController;