import { useEffect, useState } from "react";
import useSound from "use-sound";
import lose from "../assets/sounds/lose.wav";
import timee from "../assets/sounds/time.mp3";

export const Timer = ({ step, setFinish }) => {
  const [time, setTime] = useState(30);
  const volume = (localStorage.getItem("soundVolume") || "5") / 10;
  const [playSound] = useSound(lose, { volume, interrupt: true });
  const [playTime, { stop }] = useSound(timee, { volume, interrupt: true });

  useEffect(() => {
    if (time === 0) {
      stop();
      playSound();
      setFinish(true);
      return;
    }

    if (time <= 10) {
      playTime();
    }

    const interval = setInterval(() => {
      setTime((e) => e - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setFinish, time, playSound, playTime, stop]);

  useEffect(() => {
    setTime(30);
  }, [step]);

  const textColor = () =>
    time > 20
      ? `text-green-500`
      : time > 10
      ? "text-yellow-500"
      : "text-red-500 animate-ping";

  console.log(textColor());
  return (
    <div
      className={`border-4 text-3xl ${textColor()}  text-w w-28 h-28 rounded-full p-7 flex justify-center items-center`}
    >
      {time}
    </div>
  );
};
