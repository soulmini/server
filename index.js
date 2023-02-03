import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());
const configuration = new Configuration({
    organization: "org-daUY9yESlEpOHHKBPkyqCLer",
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.listen("3080", () => console.log("Listening on port 3080"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", async(req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 400,
            temperature: 0.5,
        });
        res.json({ message: response.data.choices[0].text });
    } catch (error) {
        // console.log(error)
        // res.send(error).status(400)
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
});