import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";

/**
 * HOF (higher-order function) that return express middleware function
 * used to validate user resourse (url params, url query, and request body)
 */
export default function validate(schema: AnyZodObject) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (e: any) {
			console.error("Invalid resource!");
			return res.status(400).send(e.errors);
		}
	};
}
