import { userController } from "../controllers/user.controller";
import { Router } from "express";
var cookieParser = require('cookie-parser')
import { auth } from "../middlewares/auth.middleware";
const multer  = require('multer')
const upload = multer();
// const upload = multer({ dest: 'public/uploads' })
import { uploadimg } from "../helpers/multer.helper";
import { perms } from "../middlewares/perms.middleware";
import { createUser } from "../middlewares/createUser.middleware";
import { updateUser } from "../middlewares/updateUser.middleware";
import { readUser } from "../middlewares/readUser.middleware";
import { tokenAuth } from "../middlewares/tokenAuth.middleware";
import { MiddlewareFunc } from "../interfaces/middleware.interface";
import { deleteUser } from "../middlewares/deleteUser.middleware";

const router = Router();
router.use(cookieParser())

/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: get all users
 *     description: get all users
 *     responses:
 *       200:
 *         description: all user data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Updated User data in object
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
router.get('/getAll', <MiddlewareFunc>tokenAuth.auth, <MiddlewareFunc>readUser.read,<MiddlewareFunc>perms.auth,userController.getAll);

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a user
 *     description: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: sample
 *               lastName:
 *                 type: string
 *                 example: user
 *               profile_photo:
 *                 type: string
 *                 example: url
 *               email:
 *                 type: string
 *                 example: sample@gmail.com
 *               password:
 *                 type: string
 *                 example: hashedpwd
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 example: female
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 12-07-2001
 *               role:
 *                 type: string
 *                 example: customer
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Created user in object
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
router.post('/create', uploadimg.single('profile_photo'),<MiddlewareFunc>tokenAuth.auth, <MiddlewareFunc>createUser.create, <MiddlewareFunc>perms.auth,  userController.createUser);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: sample
 *               lastName:
 *                 type: string
 *                 example: user
 *               profile_photo:
 *                 type: string
 *                 example: url
 *               email:
 *                 type: string
 *                 example: sample@gmail.com
 *               password:
 *                 type: string
 *                 example: hashedpwd
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 example: female
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 12-07-2001
 *               role:
 *                 type: string
 *                 example: customer
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
 *                   description: Updated User data in object
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
router.put('/update/:id', uploadimg.single('profile_photo'), <MiddlewareFunc>tokenAuth.auth, <MiddlewareFunc>updateUser.update, <MiddlewareFunc>perms.auth, userController.updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: deleted user
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
router.delete('/delete/:id', <MiddlewareFunc>tokenAuth.auth, <MiddlewareFunc>deleteUser.delete, <MiddlewareFunc>perms.auth,userController.deleteUser);

export default router;