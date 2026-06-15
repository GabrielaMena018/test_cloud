import express from "express";
import specialtiesController from "../controllers/specialtiesController.js";

const router = express.Router();

router.route("/").get(specialtiesController.getAllSpecialties);
router.route("/").post(specialtiesController.insertSpecialty);
router.route("/:id").put(specialtiesController.updateSpecialty);
router.route("/:id").delete(specialtiesController.deleteSpecialty);

export default router;