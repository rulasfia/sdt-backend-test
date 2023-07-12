import type { Request, Response } from "express";

export function getUserHandler(req: Request, res: Response) {
	return res.json({ message: "getting all user" });
}

export function postUserHandler(req: Request, res: Response) {
	return res.json({ message: "creating new user" });
}

export function putUserHandler(
	req: Request<{ userId: string }>,
	res: Response
) {
	const { userId } = req.params;

	return res.json({ message: "updating user by id with id = " + userId });
}

export function deleteUserHandler(
	req: Request<{ userId: string }>,
	res: Response
) {
	const { userId } = req.params;

	return res.json({ message: "deleting user by id with id = " + userId });
}
