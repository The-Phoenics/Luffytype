const audios = new Map();
const alphabets = "abcdefghijklmnopqrstuvwxyz".split(""); // array of alphabet characters ["a", "b" , ...]

export function GLoadKeyPressAudios() {
  alphabets.forEach((letter) => {
    audios.set(letter, new Audio(`/audio/${letter}.wav`));
  });
  audios.set("space", new Audio("/audio/space.wav"));
}

export function GPlayKeyPressAudio(letter) {
  if (letter === " ") {
    audios.get("space").cloneNode().play();
  } else {
    letter = letter.toLowerCase();
    if (isLowerCaseAlphabet(letter)) {
      let audio = audios.get(`${letter}`);
      audio.cloneNode().play();
    }
  }
}

function isLowerCaseAlphabet(letter) {
  return letter.length === 1 && letter.at(0) >= "a" && letter.at(0) <= "z";
}
