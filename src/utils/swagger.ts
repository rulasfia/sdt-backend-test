import type { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Docs",
			version: "1.0.0",
		},
	},
	apis: ["./src/**/*.router.ts", "./src/**/*.schema.ts"],
	servers: [{ url: "/" }],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Express) {
	// Swagger page
	app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

	app.get("/docs.json", (req: Request, res: Response) => {
		return res.json(swaggerSpec);
	});

	console.log("Docs available at /docs");
}
