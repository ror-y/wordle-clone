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
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function App() {
  const [guessedWords, setGuessedWords] = useState<Array<TGuessedWord>>([]);
  const [targetWord, setTargetWord] = useState<string>(sample(dictionary));
  console.log("tw", targetWord);
  const [guessedWordIndeces, setGuessedWordIndeces] = useState([]);
  const [isError, setIsError] = useState(false);
  const [width, height] = useWindowSize();
  const [userWon, setUserWon] = useState(false);

  function evaluateGuessedWords() {
    const isGameOver = guessedWords.length === config.ATTEMPTS_COUNT;
    const isWordGuessed = guessedWords;
    if (isGameOver) {
      alert("GAME OVER!");
    }
  }

  useEffect(() => {
    handleInvalidWord(setIsError, targetWord, () => {
      toast.error(
        `Target word '${targetWord}' is the wrong length. Check the target word and compare it to the config length.`
      );
    });
  }, []);

  useEffect(evaluateGuessedWords, [guessedWords]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ToastContainer />
      {isError ? (
        <></>
      ) : (
        <div>
          {userWon && (
            <Confetti width={width} height={height} recycle={false} />
          )}
          {times(config.ATTEMPTS_COUNT, (idx) => (
            <InputThatLooksLikeWordBlock
              key={idx}
              handleWordSubmission={handleWordSubmission(
                idx,
                targetWord,
                setGuessedWords,
                () => {
                  setUserWon(true);
                  toast("Well done! You Win!");
                }
              )}
              guessedWord={guessedWords[idx]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
