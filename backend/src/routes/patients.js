import express from "express";
import patientsController from "../controllers/patientsController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
    .get(patientsController.getPatients)

router.route("/:id")
    .put(upload.single("profilePhoto"), patientsController.updatePatients)
    .delete(patientsController.patientsDelete)

export default router;