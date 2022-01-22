import "../styles.css";
import InputThatLooksLikeWordBlock from "./InputThatLooksLikeWordBlock";
import { useEffect, useState } from "react";
import times from "lodash.times";
import sample from "lodash.sample";
import handleWordSubmission from "../actions/handleWordSubmission";
import config from "../config";
import handleInvalidWord from "../actions/handleInvalidWord";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TGuessedWord } from "../types";
import dictionary from "../data/dictionary";

export default function App() {
  const [guessedWords, setGuessedWords] = useState<Array<TGuessedWord>>([]);
  const [targetWord, setTargetWord] = useState<string>(sample(dictionary));
  console.log("tw", targetWord);
  const [guessedWordIndeces, setGuessedWordIndeces] = useState([]);
  const [isError, setIsError] = useState(false);

  function evaluateGuessedWords() {}

  useEffect(() => {
    handleInvalidWord(setIsError, targetWord, () => {
      toast.error(
        `Target word '${targetWord}' is the wrong length. Check the target word and compare it to the config length.`
      );
    });
  }, []);

  useEffect(evaluateGuessedWords, [guessedWords]);

  return (
    <div className="App">
      <ToastContainer />
      {isError ? (
        <></>
      ) : (
        <div>
          <h1>Worlde</h1>
          {times(config.ATTEMPTS_COUNT, (idx) => (
            <InputThatLooksLikeWordBlock
              key={idx}
              handleWordSubmission={handleWordSubmission(
                idx,
                targetWord,
                setGuessedWords
              )}
              guessedWord={guessedWords[idx]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
