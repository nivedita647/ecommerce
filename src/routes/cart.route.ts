import { cartController } from "../controllers/cart.controller";
import { Router } from "express";

const router = Router();

router.get('/addItem/:id',cartController.addItem);
router.get('/removeItem/:id',cartController.removeItem);
router.get('/placeOrder/:id',cartController.placeOrder);

export default router;