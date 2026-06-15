import patientsModel from "../models/patients.js";
import { v2 as cloudinary } from "cloudinary";

const patientsController = {};

patientsController.getPatients = async (req, res) => {
    try {
        const patients = await patientsModel.find();
        return res.status(200).json(patients);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

patientsController.updatePatients = async (req, res) => {
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
        } = req.body;

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

        if (req.file) {
            await cloudinary.uploader.destroy(patientFound.public_id);
            updateData.profilePhoto = req.file.path;
            updateData.public_id = req.file.filename;
        }

        await patientsModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        return res.status(200).json({ message: "Patient updated" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

patientsController.patientsDelete = async (req, res) => {
    try {
        const patientFound = await patientsModel.findById(req.params.id);

        await cloudinary.uploader.destroy(patientFound.public_id);

        const patientDeleted = await patientsModel.findByIdAndDelete(req.params.id);

        if (!patientDeleted) {
            return res.status(404).json({ message: "Patient not found" });
        }

        return res.status(200).json({ message: "Patient deleted" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

export default patientsController;