import times from "lodash.times";
import onlyDefineds from "../utils/onlyDefineds";
import config from "../config";

const handleWordSubmission = (
  idx: number,
  targetWord: string,
  setGuessedWords: any,
  successCb: any
) => (guessedWord: string) => {
  const isOverlap = targetWord
    .split("")
    .some((letter) => guessedWord.includes(letter));

  if (isOverlap) {
    const commonIndices = times(config.WORD_LENGTH, (idx) => {
      if (targetWord[idx] === guessedWord[idx]) {
        return idx;
      }
    }).filter(onlyDefineds) as Array<number>;

    const uncommonIndices = times(config.WORD_LENGTH, (idx) => {
      if (
        targetWord.includes(guessedWord[idx]) &&
        !commonIndices.includes(idx)
      ) {
        return idx;
      }
    }).filter(onlyDefineds) as Array<number>;

    setGuessedWords((prv: Array<any>) => {
      return [
        ...prv,
        {
          str: guessedWord,
          blueIndices: uncommonIndices || [],
          greenIndices: commonIndices || []
        }
      ];
    });

    if (guessedWord === targetWord) {
      successCb();
    }
  }
};

export default handleWordSubmission;
