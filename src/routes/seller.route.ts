import { Router } from "express";
import { sellerController } from '../controllers/seller.controller';
import { adminauth } from "../middlewares/adminauth.middleware";
import { sellerauth } from "../middlewares/sellerauth.middleware";
const cookieParser = require('cookie-parser');
// const multer  = require('multer')
// const upload = multer({ dest: 'public/uploads' })
import { uploadpdf } from '../helpers/multer.helper';

const router = Router();
router.use(cookieParser());

/**
 * @swagger
 * /sellers/getAll:
 *   get:
 *     summary: get all sellers
 *     description: get all sellers
 *     responses:
 *       200:
 *         description: all seller data fetched successfully
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
router.get('/getAll',adminauth.auth,sellerController.getAll);

/**
 * @swagger
 * /sellers/getCertificate/{id}:
 *   get:
 *     summary: get gstin of one seller
 *     description: get gstin of one seller
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
router.get('/getCertificate/:id',adminauth.auth,sellerController.getCertificate);

/**
 * @swagger
 * /sellers/create:
 *   post:
 *     summary: Create a seller
 *     description: Create a seller
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
router.post('/create',sellerauth.auth,uploadpdf.single('gstin_certificate'),sellerController.createSeller);

/**
 * @swagger
 * /sellers/updateSellerStatus/{id}:
 *   put:
 *     summary: Update a seller status
 *     description: Update a seller status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the seller to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: verified
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Updated seller data in object
 *                 message:
 *                   type: string
 *                   example: "Updated successfully"
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
router.put('/updateSellerStatus/:id',adminauth.auth,sellerController.updateSellerStatus);

/**
 * @swagger
 * /sellers/updateSeller/{id}:
 *   put:
 *     summary: Update a seller
 *     description: Update a seller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the seller to update
 *         schema:
 *           type: integer
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
 *                 type: string
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: verified
 *     responses:
 *       200:
 *         description: seller updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Updated seller data in object
 *                 message:
 *                   type: string
 *                   example: "Updated successfully"
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
router.put('/updateSeller/:id',sellerauth.auth,sellerController.updateSeller);

/**
 * @swagger
 * /sellers/deleteSeller/{id}:
 *   delete:
 *     summary: Delete a seller
 *     description: Delete seller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the seller to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: seller deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: deleted seller
 *                 message:
 *                   type: string
 *                   example: "Deleted successfully"
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
router.delete('/deleteSeller/:id',adminauth.auth,sellerController.deleteSeller);

export default router;