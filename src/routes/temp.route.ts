import { Router } from "express";
var cookieParser = require('cookie-parser')
import { tempController } from "../controllers/temp.controller";

const router = Router();
router.use(cookieParser());

router.get('/',tempController.getPerms)

export default router;