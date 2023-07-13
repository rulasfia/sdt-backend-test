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

router.get("/", getUserHandler);
router.post("/", validate(createUserSchema), postUserHandler);
router.put("/:id", validate(updateUserSchema), putUserHandler);
router.delete("/:id", validate(userDetailSchema), deleteUserHandler);

export default router;
