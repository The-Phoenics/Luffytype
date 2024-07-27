import express, { Express, Request, Response } from "express";
import GetRandomWords from "./GetWords.js";
import cors from "cors";

import { LANG } from "./GetWords.js";

const app: Express = express();
app.use(cors());
const PORT: number = 3000;

app.get("/", (request: Request, response: Response) => {
  response.send("Hello, ts!");
});

// english words with count: /30
app.get("/:count", (request: Request, response: Response) => {
  const count = parseInt(request.params.count);
  const words = GetRandomWords(LANG.ENGLISH, count);
  response.json(words);
});

// language route: /cpp/30
app.get("/lang/:lang/:count?", (request: Request, response: Response) => {
  const lang = request.params.lang;
  let count = parseInt(request.params.count);
  if (!count) {
    count = 100;
  }
  let languageEnum: LANG | null;

  switch (lang) {
    case "en":
      languageEnum = LANG.ENGLISH;
      break;

    case "cpp":
      languageEnum = LANG.CPP;
      break;

    case "java":
      languageEnum = LANG.JAVA;
      break;

    default:
      languageEnum = LANG.INVALID
      break;
  }

  const words = GetRandomWords(languageEnum, count);
  response.json(words);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
