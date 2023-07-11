import express from "express";

const PORT = 4000;

const app = express();

app.get("/", (_req, res) => {
	return res.json({ message: "Server running!" });
});

app.listen(PORT, () => console.log(`listening in port ${PORT}`));
