import patientsModel from "../models/patients.js";

import {v2 as cloudinary} from "cloudinary";

//array de funciones 
const patientsController = {};

//SELECT
patientsController.getPatients = async (req, res) => {
    try {
        const patients = await patientsModel.find();
        return res.status(200).json(patients);
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"});
    }
};

//Update
patientsController.updatePatients = async (req, res) => {
    try {
        //Solicitamos los nuevos datos
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
               
        } = req.body

        
        //Identificar paciente que vamos actualizar 
        const patientFound = await patientsModel.findById(req.params.id);

        const updateData = {
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
               
        };

        //Si viene imagen
        if(req.file){
            //Eliminar imagen anterior
            await cloudinary.uploader.destroy(patientFound.public_id)

            updateData.profilePhoto = req.file.path;
            updateData.public_id = req.file.filename;
        }

        //Guardar todo lo actualizado en la base de datos
        await patientsModel.findByIdAndUpdate(req.params.id,
            updateData,{
                new: true
            }
        );
        return res.status(200)({message: "patient update"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"});
    }
};

//Eliminar
patientsController.patientsDelete = async (req, res) => {
    try {
        //Buscamos cual es el paciente que vamos a eliminar
        const patientsFound = await patientsModel.findById(req.params.id);

        //Eliminamos la imagen de cloudinary
        await cloudinary.uploader.destroy(patientsFound.public_id);

        //Eliminar de la base de datos
        const patientsDeleted = await patientsModel.findOneAndDelete(req.params.id)

        if(!patientsDeleted){
            return res.status(404).json({message: "Patient not found"})
        }

        return res.status(200).json({message: "Patient deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"});
    }
};

export default patientsController;