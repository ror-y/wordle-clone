import { Static, String } from "runtypes";
import config from "../config";

const TargetWordConstraint = String.withConstraint(
  (s) => s.length === config.WORD_LENGTH
);

const handleInvalidWord = (
  setIsError: any,
  targetWord: string,
  errorCb: () => void
) => {
  try {
    TargetWordConstraint.check(targetWord);
    setIsError(false);
  } catch (err) {
    setIsError(true);
    errorCb();
  }
};

export default handleInvalidWord;
