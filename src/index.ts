import "dotenv/config";
import express from "express";
import userRouter from "./module/user/user.router";
import locationRouter from "./module/location/location.router";
import { connectToDatabase } from "./lib/db/database";
import { setupBirthdayJob } from "./lib/scheduler";

const PORT = 4000;
const DB_URL = process.env.DB_URL;

const app = express();

/** connect to database */
connectToDatabase(DB_URL);

/** setup birthday job for existing user */
setupBirthdayJob();

app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ message: "Server running!" });
});

/** users */
app.use("/user", userRouter);
/** location */
app.use("/location", locationRouter);

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
