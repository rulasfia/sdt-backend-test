import type { Request, Response } from "express";
import { findAllUser, insertNewUser } from "./user.repository";
import { CreateUserType } from "./user.schema";
import { generateID } from "@/utils/IDGenerator";

export async function getUserHandler(req: Request, res: Response) {
	const users = await findAllUser();

	return res.status(200).json({ data: users });
}

export async function postUserHandler(
	req: Request<{}, {}, CreateUserType["body"]>,
	res: Response
) {
	console.log(req.body);
	const id = await generateID();
	// const [dd, mm, yyyy] = req.body.birthday.split("/");
	const newUser = {
		id,
		...req.body,
		birthday: new Date(req.body.birthday),
		created_at: new Date(),
		updated_at: new Date(),
	};

	console.log(new Date(req.body.birthday));
	await insertNewUser(newUser);

	return res.status(201).json({ data: newUser });
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
