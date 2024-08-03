export let GData = {
  wordsCount: 0,
  currentWord: 0,
  currentLetter: 0,
  letterCountInCurrentWord: 0,
  isCtrlKeyHeldDown: false,
  isAtSpaceElement: false,
};

export const GResetData = () => {
  GData.wordsCount = 0;
  GData.currentWord = 0;
  GData.currentLetter = 0;
  GData.letterCountInCurrentWord = 0;
  GData.isCtrlKeyHeldDown = false;
  GData.isAtSpaceElement = false;
};

export const GToggleCtrlHeldDown = () => {
  GData.isCtrlKeyHeldDown = !GData.isCtrlKeyHeldDown;
}
