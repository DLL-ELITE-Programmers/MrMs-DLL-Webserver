import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from 'path'
dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app: Application = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const candidates = {
	"male": [
		"candidate_1",
		"candidate_2"
	],
	"female": [
		"candidate_1",
		"candidate_2"
	]
}

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
