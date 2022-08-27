import React from "react";

export const GameOver = ({ restart, money }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 space-y-3 text-center">
        <div>Oyun Bitti.</div>
        <div>Kazandığın para <span className="font-bold text-lg">{money} </span></div>
        <button className="bg-green-500 p-3 rounded-2xl hover:bg-green-400" onClick={restart}>
          Tekrar Başlat
        </button>
      </div>
    </div>
  );
};
