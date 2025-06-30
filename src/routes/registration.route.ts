import { Router } from "express";
import { registrationController } from '../controllers/registration.controller';
var cookieParser = require('cookie-parser')

const router = Router();
router.use(cookieParser());

router.get('/verify/:role',registrationController.verifyEmail);
router.get('/verifyOtp',registrationController.verifyOTP);
export default router;