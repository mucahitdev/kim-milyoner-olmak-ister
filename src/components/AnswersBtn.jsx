
export const AnswersBtn = ({ answer, handleClick, activeAnswer }) => {
  return (
    <div className="w-1/2 p-3">
      <button
        className={`p-2 rounded-full text-center w-full cursor-pointer hover:bg-opacity-90  ${activeAnswer === answer ? "bg-yellow-400 " : "bg-blue-400 disabled:bg-blue-900 disabled:cursor-not-allowed"}`}
        onClick={() => {
          handleClick(answer);
        }}
        disabled={activeAnswer !== null}
      >
        {answer}
      </button>
    </div>
  );
};
