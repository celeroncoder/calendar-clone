import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { NewAppointment } from "./NewAppointment";
import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { AppointmentDetails } from "./AppointmentDetails";

export const Block: React.FC<{
  idxHr: number;
  idxDay: number;
  current: Date;
  weekDates: string[];
  events: Event[];
}> = ({ idxHr, idxDay, current, weekDates, events }) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(() => {
    const event = events.filter(
      (event) =>
        event.dateTime.getDate() === new Date(weekDates[idxDay]!).getDate() &&
        event.dateTime.getHours() == idxHr + 6
    );
    if (event && event.length !== 0) return event[0];
  });

  return (
    <Popover open={open} onOpenChange={setOpen} defaultOpen={false}>
      <div className="relative flex w-44 flex-[calc(1/7)] flex-col border-b border-r border-slate-300">
        <PopoverTrigger className="z-10 h-full w-full cursor-default" />
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

        {/* event block */}
        {event && (
          <div
            className="items-right flex h-full w-full cursor-pointer flex-col justify-center rounded-sm bg-emerald-400 pl-1 text-xs"
            onClick={() => setOpen(true)}
          >
            <p className="font-bold text-slate-700">{event.clientName}</p>
            <p className="text-muted-foreground">
              {event.service.slice(0, 20)}
            </p>
          </div>
        )}
      </div>
      <PopoverContent className="min-w-fit">
        {event ? (
          <AppointmentDetails event={event} close={() => setOpen(false)} />
        ) : (
          <NewAppointment
            idxDay={idxDay}
            idxHr={idxHr}
            weekDates={weekDates}
            current={current}
            close={() => setOpen(false)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};
