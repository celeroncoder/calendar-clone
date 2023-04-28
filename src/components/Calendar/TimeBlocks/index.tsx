import { TimeBlockRow } from "./TimeBlockRow";
import { WeekListRow } from "./WeekListRow";

export const TimeBlocks: React.FC<{ weekDates: string[]; current: Date }> = ({
  weekDates,
  current,
}) => {
  return (
    <div className="flex-[calc(7/8)] flex-col border-t border-slate-300">
      {/* The Week List Row */}
      <WeekListRow weekDates={weekDates} />

      {/* dates rows */}
      {new Array(18).fill(0).map((_, idxHr) => (
        <TimeBlockRow key={idxHr} idxHr={idxHr} current={current} />
      ))}
    </div>
  );
};
