import { api } from "~/utils/api";
import { Block } from "./Block";
import { useEffect } from "react";

export const TimeBlockRow: React.FC<{
  current: Date;
  idxHr: number;
  weekDates: string[];
}> = ({ idxHr, current, weekDates }) => {
  const { data: events, isLoading } = api.event.getAllWeek.useQuery({
    start: weekDates[0]!,
    end: weekDates[weekDates.length - 1]!,
  });

  if (isLoading || !events) return <div className="h-[1520px]">Loading...</div>;

  return (
    <div className="flex h-20 flex-[calc(1/19)]">
      {new Array(7).fill(0).map((_, idxDay) => (
        <Block
          weekDates={weekDates}
          key={idxDay}
          idxDay={idxDay}
          current={current}
          idxHr={idxHr}
          events={events}
        />
      ))}
    </div>
  );
};
