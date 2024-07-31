import english_words from "../data/words.js";
import cpp_words from "../data/lang/cpp_words.js";
import java_words from "../data/lang/java_words.js";
export var LANG;
(function (LANG) {
    LANG[LANG["ENGLISH"] = 0] = "ENGLISH";
    LANG[LANG["CPP"] = 1] = "CPP";
    LANG[LANG["JAVA"] = 2] = "JAVA";
    LANG[LANG["INVALID"] = 3] = "INVALID";
})(LANG || (LANG = {}));
export default function GetRandomWords(lang, count = 100) {
    let wordsArray;
    switch (lang) {
        case LANG.ENGLISH:
            wordsArray = english_words.data;
            break;
        case LANG.CPP:
            wordsArray = cpp_words.data;
            break;
        case LANG.JAVA:
            wordsArray = java_words.data;
            break;
        default:
            wordsArray = english_words.data;
            break;
    }
    count = count <= wordsArray.length ? count : wordsArray.length;
    wordsArray = ShuffleArray(wordsArray);
    return wordsArray.slice(0, count);
}
function ShuffleArray(array) {
    if (array.length > 1) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
}
