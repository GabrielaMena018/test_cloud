import medicalRecordsModel from "../models/medicalRecords.js";

const medicalRecordsController = {};

medicalRecordsController.getAllMedicalRecords = async (req, res) => {
    try {
        const records = await medicalRecordsModel
            .find()
            .populate("patient_id", "name lastName email");
        return res.status(200).json(records);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

medicalRecordsController.insertMedicalRecord = async (req, res) => {
    try {
        const { patient_id, diagnosis, medications, medicalNotes } = req.body;

        const newRecord = new medicalRecordsModel({
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        });

        await newRecord.save();
        return res.status(200).json({ message: "Medical record created" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

medicalRecordsController.updateMedicalRecord = async (req, res) => {
    try {
        const { patient_id, diagnosis, medications, medicalNotes } = req.body;

        await medicalRecordsModel.findByIdAndUpdate(
            req.params.id,
            { patient_id, diagnosis, medications, medicalNotes },
            { new: true }
        );

        return res.status(200).json({ message: "Medical record updated" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

medicalRecordsController.deleteMedicalRecord = async (req, res) => {
    try {
        await medicalRecordsModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Medical record deleted" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default medicalRecordsController;