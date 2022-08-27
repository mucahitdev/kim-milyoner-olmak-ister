import { useState, useEffect } from "react";
import { AnswersBtn } from "./AnswersBtn";
import { Piramit } from "./Piramit";
import { Timer } from "./Timer";
import { GameOver } from "./index";
import { questions, correctAnswers, stepMoney } from "../data";
import toast from "react-hot-toast";
import useSound from "use-sound";
import play from "../assets/sounds/play.mp3";
import correct from "../assets/sounds/correct.mp3";
import wrong from "../assets/sounds/wrong.mp3";
import wait from "../assets/sounds/wait.mp3";
import { useDocumentTitle } from "../config/hooks";

export const GameArea = () => {
  const [questionData, setQuestionData] = useState(null);
  const [corAnswer, setCorAnswer] = useState(null);
  const [step, setStep] = useState(0);
  const [finish, setFinish] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const volume = (localStorage.getItem("soundVolume") || "5") / 10;
  const [playSound] = useSound(play, { volume, interrupt: true });
  const [correctSound] = useSound(correct, { volume, interrupt: true });
  const [wrongSound] = useSound(wrong, { volume, interrupt: true });
  const [waitSound, { stop }] = useSound(wait, { volume });
  const getQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return [questions[randomIndex], correctAnswers[randomIndex]];
  };

  useDocumentTitle(`${step + 1}. Soru`);

  useEffect(() => {
    playSound();
  }, [playSound]);

  useEffect(() => {
    const data = getQuestion();
    setQuestionData(data[0]);
    setCorAnswer(data[1]);
    if (step === 12) {
      setFinish(true);
    }
  }, [step]);

  const handleClick = (answer) => {
    setActiveAnswer(answer);
    setAnswered(true);
    waitSound();
    const timout = setTimeout(() => {
      if (step !== 12) {
        if (answer === corAnswer.answer) {
          correctSound();
          toast.success("Doğru Cevap");
          setStep(step + 1);
        } else {
          wrongSound();
          toast.error("Yanlış Cevap");
          setFinish(true);
        }
      } else {
        toast.success("Oyun Bitti");
      }
      stop();
      setActiveAnswer(null);
      setAnswered(false);
    }, 3000);
    return () => clearTimeout(timout);
  };

  const restart = () => {
    setFinish(false);
    playSound();
    setStep(0);
  };

  const activeMoney = stepMoney.find((item) => item.id === step + 1);

  return (
    <div className="h-full w-full">
      {!finish ? (
        <div className="h-full flex">
          <div className="w-full sm:w-3/4 rounded-tl-md">
            <div className="h-2/5 flex flex-col justify-center items-center">
              <Timer setFinish={setFinish} step={step} answered={answered} />
              <div className="text-2xl pt-5 text-green-500">
                <b> {activeMoney.money} </b>
              </div>
            </div>
            <div className="h-3/5">
              <div className="h-1/3 flex justify-center items-center">
                <p className="bg-blue-400 p-4 text-justify rounded-full">
                  {questionData && questionData.question}
                </p>
              </div>
              <div className="h-2/3 flex flex-wrap  items-center">
                {questionData &&
                  questionData.answers.map((answer, index) => (
                    <AnswersBtn
                      key={index}
                      answer={answer}
                      handleClick={handleClick}
                      activeAnswer={activeAnswer}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="w-1/4 hidden sm:block">
            <div className="h-full flex flex-col justify-around rounded-tr-md">
              {stepMoney.map((data, index) => (
                <Piramit key={index} data={data} active={activeMoney.money} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <GameOver restart={restart} money={activeMoney.money} />
      )}
    </div>
  );
};
