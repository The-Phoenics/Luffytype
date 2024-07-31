import express from "express";
import GetRandomWords from "./GetWords.js";
import cors from "cors";
import { LANG } from "./GetWords.js";
const app = express();
app.use(cors());
const PORT = 3000;
app.get("/", (request, response) => {
    response.send("Hello, ts!");
});
// english words with count: /30
app.get("/:count", (request, response) => {
    const count = parseInt(request.params.count);
    const words = GetRandomWords(LANG.ENGLISH, count);
    response.json(words);
});
// language route: /cpp/30
app.get("/lang/:lang/:count?", (request, response) => {
    const lang = request.params.lang;
    let count = parseInt(request.params.count);
    if (!count) {
        count = 100;
    }
    let languageEnum;
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
            languageEnum = LANG.INVALID;
            break;
    }
    const words = GetRandomWords(languageEnum, count);
    response.json(words);
});
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
