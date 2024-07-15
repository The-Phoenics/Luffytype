export let GData = {
  currentWord: 0,
  currentLetter: 0,
  letterCountInCurrentWord: 0,
  isCtrlKeyHeldDown: false
};

export const GResetData = () => {
  GData.currentWord = 0;
  GData.currentLetter = 0;
  GData.letterCountInCurrentWord = 0;
};

export const GToggleCtrlHeldDown = () => {
  GData.isCtrlKeyHeldDown = !GData.isCtrlKeyHeldDown;
}