import express from "express";
import validate from "@/middleware/validateMiddleware";
import {
	getCityDetailHandler,
	getCityHandler,
	getCountryHandler,
} from "./location.controller";
import {
	getCityDetailSchema,
	getCitySchema,
	getCountrySchema,
} from "./location.schema";

const router = express.Router();

router.get("/country", validate(getCountrySchema), getCountryHandler);
router.get("/city", validate(getCitySchema), getCityHandler);
router.get("/city/:id", validate(getCityDetailSchema), getCityDetailHandler);

export default router;
