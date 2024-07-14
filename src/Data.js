export let data = {
  currentWord: 0,
  currentLetter: 0,
  letterCountInCurrentWord: 0,
};

export const resetData = () => {
  data.currentWord = 0;
  data.currentLetter = 0;
  data.letterCountInCurrentWord = 0;
};
