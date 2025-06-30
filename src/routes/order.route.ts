import { orderController } from "../controllers/order.controller";
import { Router } from "express";

const router = Router();

router.post('/create/:id',orderController.create);
router.post('/addItem/:id',orderController.addItem);
router.get('/checkout/:id',orderController.checkout);

export default router;