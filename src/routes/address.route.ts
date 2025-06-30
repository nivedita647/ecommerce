import { Router } from "express";
import { addressController } from "../controllers/address.controller";
import { upload } from "../helpers/multer.helper";

const router = Router();

router.get('/getAll',addressController.getAll);
router.get('/getAddressByUserId/:id',addressController.getAddressByUserId);
router.post('/create',upload.none(),addressController.createAddress);

export default router;