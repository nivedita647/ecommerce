import { Router } from "express";
import { adminController } from '../controllers/admin.controller';
import { adminauth } from "../middlewares/adminauth.middleware";
const cookieParser = require('cookie-parser');

const router = Router();
router.use(cookieParser())

router.get('/adminlogin',adminController.adminLogin);
router.get('/adminStats',adminauth.auth,adminController.generateStats);

export default router;
