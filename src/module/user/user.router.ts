import express from "express";
import {
	deleteUserHandler,
	getUserHandler,
	postUserHandler,
	putUserHandler,
} from "./user.controller";
import validate from "@/middleware/validateMiddleware";
import {
	createUserSchema,
	updateUserSchema,
	userDetailSchema,
} from "./user.schema";

const router = express.Router();

/**
 * @openapi
 * /user:
 *  get:
 *     tags:
 *     - User
 *     description: Get list of all user
 *     responses:
 *       200:
 *         description: List of all user
 */
router.get("/", getUserHandler);

/**
 * @openapi
 * /user:
 *  post:
 *     tags:
 *     - User
 *     summary: Add new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 */
router.post("/", validate(createUserSchema), postUserHandler);

/**
 * @openapi
 * /user/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update user data
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/SuccessResponse'
 */
router.put("/:id", validate(updateUserSchema), putUserHandler);

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete user data
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/SuccessResponse'
 */
router.delete("/:id", validate(userDetailSchema), deleteUserHandler);

export default router;
