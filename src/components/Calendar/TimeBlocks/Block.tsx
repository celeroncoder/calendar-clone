export const Block: React.FC<{
  idxHr: number;
  idxDay: number;
  current: Date;
}> = ({ idxHr, idxDay, current }) => {
  return (
    <div className="flex w-44 flex-[calc(1/7)] flex-col border-b border-r border-slate-300">
      {new Array(60).fill(0).map((_, idxMin) => (
        <div key={idxMin} className="flex-[calc(1/60)]">
          {idxMin + 1 === current.getMinutes() &&
            idxHr + 6 === current.getHours() &&
            idxDay + 1 === current.getDay() && (
              <div className="relative h-full w-full bg-blue-500">
                <p className="absolute -bottom-[4.5px] -left-[5.5px] h-[10px] w-[10px] rounded-full bg-blue-500"></p>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
