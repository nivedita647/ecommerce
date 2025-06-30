import { categoryController } from "../controllers/category.controller";
import { Router } from "express";
import { adminauth } from "../middlewares/adminauth.middleware";
// const multer  = require('multer')
// const upload = multer({ dest: 'public/uploads' })
import { uploadimg } from "../helpers/multer.helper";
var cookieParser = require('cookie-parser')

const router = Router();
router.use(cookieParser())

router.get('/getAll',categoryController.getAll);
router.get('/getCategoryByName',categoryController.getCategoryByName)
router.post('/create',adminauth.auth,uploadimg.single('photo'),categoryController.create);

export default router;