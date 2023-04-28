import { useEffect, useState } from "react";
import { TimeColumn } from "./TimeColumn";
import { TimeBlocks } from "./TimeBlocks";

export const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const Calendar = () => {
  const [weekDates, _] = useState<string[]>(() => {
    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }

    return week;
  });

  const [current, setCurrent] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(new Date());
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [current]);

  return (
    <div className="flex w-full select-none p-2">
      {/* time labels */}
      <TimeColumn />
      {/* the blocks */}
      <TimeBlocks current={current} weekDates={weekDates} />
    </div>
  );
};
