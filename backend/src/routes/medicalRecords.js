import express from "express";
import medicalRecordsController from "../controllers/medicalRecordsController.js";

const router = express.Router();

router.route("/").get(medicalRecordsController.getAllMedicalRecords);
router.route("/").post(medicalRecordsController.insertMedicalRecord);
router.route("/:id").put(medicalRecordsController.updateMedicalRecord);
router.route("/:id").delete(medicalRecordsController.deleteMedicalRecord);

export default router;