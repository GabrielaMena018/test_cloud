import express from "express";
import appointmentsController from "../controllers/appointmentsController.js";

const router = express.Router();

router.route("/").get(appointmentsController.getAllAppointments);
router.route("/").post(appointmentsController.insertAppointment);
router.route("/:id").put(appointmentsController.updateAppointment);
router.route("/:id").delete(appointmentsController.deleteAppointment);

export default router;