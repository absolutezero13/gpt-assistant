const express = require("express");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const mongoose = require("mongoose");
const AppProperties = require("./model/appProperties");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/tokens", async (req, res) => {
  try {
    await AppProperties.findOneAndUpdate(
      {
        key: "tokens-used",
      },
      {
        $inc: {
          tokens: req.body.tokens,
        },
      }
    );

    res.status(200).send("Tokens updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.content,
        },
      ],
    });

    res.status(200).send(response.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);

      res.status(error.response.status).send(error.response.data);
    } else {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
