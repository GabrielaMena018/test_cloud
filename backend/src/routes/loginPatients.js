import express from "express";
import loginPatientsController from '../controllers/loginPatientController.js';


const router = express.Router();

router.route("/")
    .post(loginPatientsController.login);

export default router;