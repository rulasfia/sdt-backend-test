import express from "express";
import {
	deleteUserHandler,
	getUserHandler,
	postUserHandler,
	putUserHandler,
} from "./user.controller";
import validate from "@/middleware/validateMiddleware";
import { createUserSchema } from "./user.schema";

const router = express.Router();

router.get("/", getUserHandler);
router.post("/", validate(createUserSchema), postUserHandler);
router.put("/:userId", putUserHandler);
router.delete("/:userId", deleteUserHandler);

export default router;
