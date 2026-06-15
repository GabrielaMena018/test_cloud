/*
    Campos:
        patient_id
        diagnosis
        medications [{ medicineName }]
        medicalNotes
*/
import { Schema, model } from "mongoose";

const medicalRecordSchema = new Schema({
    patient_id: { type: Schema.Types.ObjectId, ref: "Patients" },
    diagnosis: { type: String },
    medications: [
        {
            medicineName: { type: String }
        }
    ],
    medicalNotes: { type: String }
}, {
    timestamps: true,
    strict: false
});

export default model("MedicalRecords", medicalRecordSchema);