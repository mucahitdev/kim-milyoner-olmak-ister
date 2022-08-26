
export const AnswersBtn = ({ answer, handleClick, activeAnswer }) => {
  return (
    <div className="w-1/2 p-3">
      <p
        className={`p-2 rounded-full text-center cursor-pointer hover:bg-opacity-90 ${activeAnswer === answer ? "bg-yellow-400 " : "bg-blue-400"}`}
        onClick={() => {
          handleClick(answer);
        }}
      >
        {answer}
      </p>
    </div>
  );
};
