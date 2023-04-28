export const TimeColumn = () => {
  return (
    <div className="flex flex-[calc(1/8)] flex-col border-l border-t border-slate-300">
      <div className="flex flex-[calc(1/19)] items-center justify-center border-b border-r border-slate-300 text-lg">
        All Day
      </div>
      {new Array(18).fill(0).map((val, idx) => (
        <div
          key={idx}
          className="flex flex-[calc(1/19)] items-center justify-center border-b border-r border-slate-300 text-lg"
        >
          {idx + 6}:00 - {idx + 7}:00
        </div>
      ))}
    </div>
  );
};
