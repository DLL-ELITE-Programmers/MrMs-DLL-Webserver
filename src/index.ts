// TODO: Main Call function

import express from "express";

const app = express()
const PORT = 3000
app.use(express.json())

const candidate_test = {
    "male": [
        'candidate_1',
        'candidate_2'
    ],
    "female": [
        'candidate_1',
        'candidate_2'
    ]
}

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/template/index.html`)
})

app.get("/candidates", (req, res) => {
    if(req.query['code'] == "hellolord"){
        return res.send(candidate_test)
    }
    return res.send({
        "error": "Not authorized"
    })
})

app.listen(PORT, () => {
    console.log(`Running: http://localhost:3000`)
})