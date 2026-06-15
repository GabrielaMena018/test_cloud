import express from "express";
import recoveryPasswordPatientsController from "../controllers/recoveryPasswordPatientsController.js";

const router = express.Router();

router.route("/requestCode").post(recoveryPasswordPatientsController.requestCode);
router.route("/verifyCode").post(recoveryPasswordPatientsController.verifyCode);
router.route("/newPassword").post(recoveryPasswordPatientsController.newPassword);

export default router;