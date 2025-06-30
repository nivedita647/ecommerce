import { Router } from "express";
import { productController } from '../controllers/product.controller';

const router = Router();

router.get('/getAll',productController.getAll);
router.get('/getProductBySellerProductId/:id',productController.getProductBySellerProductId);
// router.post('/create',productController.createProduct);

export default router;