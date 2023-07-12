import express from "express";
import { getCityDetailHandler, getCityHandler } from "./location.controller";
import validate from "@/middleware/validateMiddleware";
import { getCityDetailSchema, getCitySchema } from "./location.schema";

const router = express.Router();

router.get("/city", validate(getCitySchema), getCityHandler);
router.get("/city/:id", validate(getCityDetailSchema), getCityDetailHandler);

export default router;
