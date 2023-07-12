import express from "express";
import { getCityHandler } from "./location.controller";
import validate from "@/middleware/validateMiddleware";
import { getCitySchema } from "./location.schema";

const router = express.Router();

router.get("/city", validate(getCitySchema), getCityHandler);

export default router;
