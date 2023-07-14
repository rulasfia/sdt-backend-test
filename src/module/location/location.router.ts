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

/**
 * @openapi
 * /location/country:
 *  get:
 *     tags:
 *     - Location
 *     summary: Get list of country
 *     parameters:
 *      - name: name
 *        in: query
 *        description: search country by name
 *        default: indo
 *      - name: iso_name
 *        in: query
 *        description: search country by 2 letter iso name
 *        example: id
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCountryResponse'
 */
router.get("/country", validate(getCountrySchema), getCountryHandler);

/**
 * @openapi
 * /location/city:
 *  get:
 *     tags:
 *     - Location
 *     summary: Get list of city
 *     parameters:
 *      - name: name
 *        in: query
 *        description: search city by name
 *        default: semarang
 *      - name: contry_id
 *        in: query
 *        description: search city by country id
 *        example: 102
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCityResponse'
 */
router.get("/city", validate(getCitySchema), getCityHandler);

/**
 * @openapi
 * /location/city/{id}:
 *  get:
 *     tags:
 *     - Location
 *     summary: Get city detail
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the city
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetCityResponse'
 */
router.get("/city/:id", validate(getCityDetailSchema), getCityDetailHandler);

export default router;
