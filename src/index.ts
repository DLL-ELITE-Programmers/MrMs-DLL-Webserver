// TODO: Main Call function

import express from "express";

const app = express()
const PORT = 3000
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/template/index.html`)
})

app.listen(PORT, () => {
    console.log(`Running: http://localhost:3000`)
})