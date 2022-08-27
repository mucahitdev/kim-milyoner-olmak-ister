import { useState } from "react";
import { GameArea } from "../components";
import { useDocumentTitle } from "../config/hooks";

export const Game = () => {
  const [gameStart, setGameStart] = useState(false);
  useDocumentTitle('Oyun')

  return (
    <div className="h-full flex  flex-col items-center">
      <h3 className="font-bold text-2xl">Oyun Alanına Hoşgeldin</h3>
      {!gameStart ? (
        <button
          onClick={() => setGameStart(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Oyuna Başla
        </button>
      ) : (
        <GameArea />
      )}
    </div>
  );
};
