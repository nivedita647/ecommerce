import { loginController } from "../controllers/login.controller";
import { Router } from "express";

const router = Router();

router.get('/login',loginController.login);

export default router;
