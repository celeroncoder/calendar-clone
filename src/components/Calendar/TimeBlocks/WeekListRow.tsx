import { Days } from "..";

export const WeekListRow: React.FC<{ weekDates: string[] }> = ({
  weekDates,
}) => {
  return (
    <div className="flex h-20 flex-[calc(1/19)]">
      {new Array(Days.length).fill(0).map((_, idx) => (
        <div
          key={idx}
          className="flex w-44 flex-[calc(1/7)] flex-col items-center justify-center gap-1 border-b border-r border-slate-300"
        >
          {new Date().getDate().toString() ===
          weekDates[idx]!.slice(weekDates[idx]!.length - 2) ? (
            <>
              <p className="text-blue-500">{Days[idx]?.slice(0, 3)}</p>
              <p className="text-md rounded-full bg-blue-100 px-2 py-1 font-bold text-blue-500">
                {weekDates[idx]!.slice(weekDates[idx]!.length - 2)}
              </p>
            </>
          ) : (
            <>
              <p className="text-slate-500">{Days[idx]?.slice(0, 3)}</p>
              <p className="text-lg font-bold text-slate-500">
                {weekDates[idx]!.slice(weekDates[idx]!.length - 2)}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
