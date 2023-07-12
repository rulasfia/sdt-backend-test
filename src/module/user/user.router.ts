import express from "express";
import {
	deleteUserHandler,
	getUserHandler,
	postUserHandler,
	putUserHandler,
} from "./user.controller";

const router = express.Router();

router.get("/", getUserHandler);
router.post("/", postUserHandler);
router.put("/:userId", putUserHandler);
router.delete("/:userId", deleteUserHandler);

export default router;
