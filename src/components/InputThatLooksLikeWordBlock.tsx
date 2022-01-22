import { useState, useRef } from "react";
import LetterBlock from "./LetterBlock";
import { TGuessedWord } from "../types";
import times from "lodash.times";
import config from "../config";

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const InputThatLooksLikeWordBlock: React.FC<{
  handleWordSubmission: any;
  guessedWord: TGuessedWord;
}> = ({ handleWordSubmission, guessedWord }) => {
  const [word, setWord] = useState("");
  const [inputRef, setInputFocus] = useFocus();

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
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        onChange={handleChange}
        value={word}
        ref={inputRef}
        style={{ opacity: 0, position: "absolute" }}
      />
      <div style={{ display: "flex" }} onClick={setInputFocus}>
        {!guessedWord ? (
          <>
            {times(config.WORD_LENGTH, (i) => (
              <LetterBlock key={i} isActive={word.length === i}>
                {word[i]}
              </LetterBlock>
            ))}
          </>
        ) : (
          word.split("").map((letter, i) => (
            <LetterBlock
              isActive={word.length === i}
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
