import type { Request, Response } from "express";
import type {
	CreateUserType,
	UpdateUserType,
	UserDetailType,
} from "./user.schema";
import { generateID } from "@/utils/IDGenerator";
import { User, deleteUserById } from "./user.repository";
import { findAllUser, insertNewUser, updateUserById } from "./user.repository";
import {
	addNewBirthdayJob,
	removeBirthdayJob,
	rescheduleBirthdayJob,
} from "@/lib/scheduler";

export async function getUserHandler(req: Request, res: Response) {
	const users = await findAllUser();

	return res.status(200).json({ data: users });
}

export async function postUserHandler(
	req: Request<{}, {}, CreateUserType["body"]>,
	res: Response
) {
	// console.log(req.body);
	const id = await generateID();

	const newUser: User = {
		id,
		...req.body,
		birthday: new Date(`${req.body.birthday} UTC`),
		created_at: new Date(),
		updated_at: new Date(),
	};

	await insertNewUser(newUser);
	await addNewBirthdayJob(newUser);

	return res.status(201).json({ data: newUser });
}

export async function putUserHandler(
	req: Request<UpdateUserType["params"], {}, UpdateUserType["body"]>,
	res: Response
) {
	const { id } = req.params;

	const updatedUser = {
		...req.body,
		birthday: new Date(`${req.body.birthday} UTC`),
		updated_at: new Date(),
	};

	await updateUserById(id, updatedUser);
	await rescheduleBirthdayJob(id, updatedUser);

	return res.json({ message: "OK" });
}

export async function deleteUserHandler(
	req: Request<UserDetailType["params"]>,
	res: Response
) {
	const { id } = req.params;

	await deleteUserById(id);
	removeBirthdayJob(id);

	return res.json({ message: "OK" });
}
