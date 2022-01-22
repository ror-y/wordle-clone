import { useState } from "react";
import LetterBlock from "./LetterBlock";
import { TGuessedWord } from "../types";
import times from "lodash.times";
import config from "../config";

const InputThatLooksLikeWordBlock: React.FC<{
  handleWordSubmission: any;
  guessedWord: TGuessedWord;
}> = ({ handleWordSubmission, guessedWord }) => {
  const [word, setWord] = useState("");

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    if (value.length <= config.WORD_LENGTH) {
      setWord(value);
    }
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    if (word.length === config.WORD_LENGTH) {
      handleWordSubmission(word);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={word} />
      <div style={{ display: "flex" }}>
        {!guessedWord ? (
          <>
            {times(config.WORD_LENGTH, (i) => (
              <LetterBlock key={i}></LetterBlock>
            ))}
          </>
        ) : (
          word.split("").map((letter, i) => (
            <LetterBlock
              isGreen={guessedWord.greenIndices.includes(i)}
              isBlue={guessedWord.blueIndices.includes(i)}
              key={i}
            >
              {letter}
            </LetterBlock>
          ))
        )}
      </div>
    </form>
  );
};

export default InputThatLooksLikeWordBlock;
