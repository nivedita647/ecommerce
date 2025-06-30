import { Router } from "express";
import { seller_productController } from '../controllers/seller_product.controller';
import { sellerauth } from "../middlewares/sellerauth.middleware";
const cookieParser = require('cookie-parser');
// const multer  = require('multer')
// const upload = multer({ dest: 'public/uploads' })
import { uploadimg } from "../helpers/multer.helper";
import { tokenAuth } from "../middlewares/tokenAuth.middleware";
import { perms } from "../middlewares/perms.middleware";
import { createProduct } from "../middlewares/product.middleware/createProduct.middleware";
import { deleteProduct } from "../middlewares/product.middleware/deleteProduct.middleware";
import { MiddlewareFunc } from "../interfaces/middleware.interface";

const router = Router();
router.use(cookieParser());

/**
 * @swagger
 * /seller_products/getAll:
 *   get:
 *     summary: get all seller_products
 *     description: get all seller_products
 *     responses:
 *       200:
 *         description: all seller_products data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: fetched seller data in object
 *                 message:
 *                   type: string
 *                   example: "fetched successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.get('/getAll', seller_productController.getAll);

/**
 * @swagger
 * /seller_products/getSeller_productBySellerId/{id}:
 *   get:
 *     summary: get seller_products of one seller
 *     description: get seller_products of one seller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the seller to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: certificate fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: certificate fetched successfully
 *                 message:
 *                   type: string
 *                   example: "fetched successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.get('/getSeller_productBySellerId/:id', seller_productController.getSeller_productBySellerId);

/**
 * @swagger
 * /seller_products/getSeller_productByCategory/{id}:
 *   get:
 *     summary: get seller_products of one category
 *     description: get seller_products of one category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the category to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: category fetched successfully
 *                 message:
 *                   type: string
 *                   example: "fetched successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.get('/getSeller_productByCategory/:id', seller_productController.getSeller_productByCategory);

router.get('/search', seller_productController.get)

router.get('/globalSearch', seller_productController.globalSearch)

/**
 * @swagger
 * /seller_products/create:
 *   post:
 *     summary: Create a seller_product
 *     description: Create a seller_product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gst_num:
 *                 type: string
 *                 example: 09ABHSPO13246
 *               gstin_certificate:
 *                 type: string
 *                 example: someurl
 *               user_id:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: verified
 *     responses:
 *       201:
 *         description: seller created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Created seller in object
 *                 message:
 *                   type: string
 *                   example: "Created successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
router.post('/create', uploadimg.array('images'), <MiddlewareFunc>tokenAuth.auth, <MiddlewareFunc>createProduct.create, <MiddlewareFunc>perms.auth, seller_productController.createSeller_product);
router.put('/update/:id', sellerauth.auth, seller_productController.update);
router.delete('/delete/:id', <MiddlewareFunc>tokenAuth.auth, <MiddlewareFunc>deleteProduct.delete, <MiddlewareFunc>perms.auth, seller_productController.delete);

export default router;