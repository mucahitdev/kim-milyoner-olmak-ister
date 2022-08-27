import React from "react";

export const Piramit = ({ data, active }) => {
  const actived = active === data.money;
  return (
    <div className="text-center">
      <span
        className={`text-center  rounded-full p-2 ${
          actived ? "bg-green-400" : "bg-blue-300"
        }`}
      >
        {data.money}
      </span>
    </div>
  );
};
