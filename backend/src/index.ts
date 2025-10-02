import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from 'path'
import cors from "cors"
import * as fs from "fs"
import access_middleware from "./middleware/access_middleware";
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app: Application = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const candidates = JSON.parse(fs.readFileSync(path.join(__dirname, "data/participant.json"), "utf-8"))
const datafile = `data/data.json`

const categories = [
  "Institutional",
  "Evening Gown",
  "Summer wear"
]

app.get("/", (_req: Request, res: Response) => {
	res.send("Hello po")
});

app.get("/candidates", (req: Request, res: Response) => {
	const header = req.headers
	if(header.referer && header.origin && header["sec-fetch-mode"] === "cors"){
		if(req.query['code'] === "missnapokita"){
			return res.json(candidates)
		}
	}
	res.status(404).json({
		"error": "Something went wrong",
		"code": "BEBE_NOT_FOUND"
	})
})

app.get("/categories", (req: Request, res: Response) => {
	res.json(categories)
})

app.post("/submit-score", (req: Request, res: Response) => {
	
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} (env=${process.env.NODE_ENV || "development"})`);
});
