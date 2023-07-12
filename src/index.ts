import "dotenv/config";
import express from "express";
import userRouter from "./module/user/user.router";
import { connectToDatabase } from "./lib/db/database";

const PORT = 4000;
const DB_URL = process.env.DB_URL;

const app = express();

/** connect to database */
connectToDatabase(DB_URL);

app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ message: "Server running!" });
});

/** users */
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
