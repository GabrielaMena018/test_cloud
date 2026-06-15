import registerPatientController from '../controllers/registerPatientsController.js';

const router = express.Router();

router.route("/").post(registerPatientController.register);
//Subendpoint: Son enpoints dentro de otros 
router.route("/verifyCodeEmail").post(registerPatientController.verifyCodeEmail);

export default router;