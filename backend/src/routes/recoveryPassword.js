import recoveryPasswordPatientsController from '../controllers/recoveryPasswordPatientsController.js';

router.route("/requestCode").post(recoveryPasswordPatientsController.requestCode);
router.route("/verifyCode").post(recoveryPasswordPatientsController.verifyCode);
router.route("/newPassword").post(recoveryPasswordPatientsController.newPassword);