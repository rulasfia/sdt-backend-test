import "dotenv/config";
import express from "express";
import userRouter from "./module/user/user.router";

const PORT = 4000;

const app = express();

app.get("/", (req, res) => {
	return res.json({ message: "Server running!" });
});

/** users */
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
