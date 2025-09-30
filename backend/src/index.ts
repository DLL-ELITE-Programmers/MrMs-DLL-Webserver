import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from 'path'
import cors from "cors"
import * as fs from "fs"
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app: Application = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const candidates = JSON.parse(fs.readFileSync(path.join(__dirname, "data/participant.json"), "utf-8"))
const datafile = `data/data.json`

app.get("/", (_req: Request, res: Response) => {
	res.sendFile(`${__dirname}/template/index.html`)
});

app.get("/candidates", (req: Request, res: Response) => {
	if(req.query['code'] === "missnapokita"){
		return res.json(candidates)
	}
	res.json({
		"error": "Not Authorized"
	})
})


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} (env=${process.env.NODE_ENV || "development"})`);
});
