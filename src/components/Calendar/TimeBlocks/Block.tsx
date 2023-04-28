import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { NewAppointment } from "./NewAppointment";
import { useState } from "react";

export const Block: React.FC<{
  idxHr: number;
  idxDay: number;
  current: Date;
  weekDates: string[];
}> = ({ idxHr, idxDay, current, weekDates }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen} defaultOpen={false}>
      <div className="flex w-44 flex-[calc(1/7)] flex-col border-b border-r border-slate-300">
        <PopoverTrigger className="h-full w-full cursor-default" />
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
      <PopoverContent className="min-w-fit">
        <NewAppointment
          idxDay={idxDay}
          idxHr={idxHr}
          weekDates={weekDates}
          current={current}
          close={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};
