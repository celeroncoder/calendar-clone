import { Event } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { CalendarDatePickerWithPresets } from "~/components/ui/DatePicker";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { generateTimeSlots } from "./NewAppointment";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { useToast } from "~/components/ui/use-toast";

export const AppointmentDetails: React.FC<{
  event: Event;
  close: () => void;
}> = ({ event, close }) => {
  const [date, setDate] = useState<Date | undefined>(event.dateTime);

  const [timeSlots] = useState(generateTimeSlots());
  const defaultTimeSlot = timeSlots[event.dateTime.getHours() - 6];
  const [timeSlot, setTimeSlot] = useState(defaultTimeSlot);

  const [service, setService] = useState(event.service);
  const [serviceFee, setServiceFee] = useState(event.serviceFee);

  const [location, setLocation] = useState<string | undefined>(event.location);

  const { mutateAsync: updateEvent } = api.event.update.useMutation();

  const { toast: showNotification } = useToast();

  const update = async () => {
    const result = await updateEvent({
      id: event.id,
      service: service,
      dateTime: date,
      location: location,
      serviceFee: serviceFee,
    });

    if (result.error || !result.id)
      showNotification({
        title: "Error!",
        description: "Some Error Occurred while creating the appointment.",
      });
    else {
      showNotification({
        title: "Appointment Update!",
        description: "The Appointment has been update successfully!",
      });
    }
    close();
  };

  return (
    <div className="flex flex-col space-y-2 px-2">
      {/* title */}
      <div className="flex justify-between gap-2">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">
            {event.clientName}'s Appointment
          </h4>
          <p className="text-sm text-muted-foreground">Appointment Details</p>
        </div>
        <div className="flex max-h-fit items-center justify-center">
          <div className="group cursor-pointer rounded p-1 duration-200 hover:bg-muted">
            <Trash
              className="text-muted-foreground group-hover:text-red-400"
              size={14}
            />
          </div>
        </div>
      </div>

      {/* date */}
      <div className="space-y-1">
        <Label>Date</Label>
        <CalendarDatePickerWithPresets date={date!} setDate={setDate} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="time">Time Slot</Label>
        <Select
          value={timeSlot}
          onValueChange={(value) => {
            setTimeSlot(value);
            date?.setHours(timeSlots.indexOf(value) + 6!);
            setDate(date);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((val) => (
              <SelectItem value={val} key={val}>
                {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Serivce */}
      <div className="space-y-1">
        <Label htmlFor="service">Service</Label>
        <Input
          value={service}
          onChange={(e) => setService(e.target.value)}
          type="text"
          id="service"
          placeholder="Pathology Consultancy"
        />
      </div>

      {/* Serivce Fee */}
      <div className="space-y-1">
        <Label htmlFor="service">Service Fee</Label>
        <Input
          value={serviceFee}
          onChange={(e) => setServiceFee(parseInt(e.target.value))}
          type="number"
          id="fee"
          placeholder="100"
        />
      </div>

      {/* Location */}
      <div className="space-y-1">
        <Label htmlFor="location">Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="service"
          placeholder="Unassigned"
        />
      </div>

      {/* Buttons */}
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button onClick={close} variant="ghost">
          Cancel
        </Button>
        <Button
          onClick={update}
          disabled={
            service.length == 0 ||
            (service == event.service &&
              location == event.location &&
              timeSlot == defaultTimeSlot &&
              serviceFee == event.serviceFee &&
              date == event.dateTime)
          }
        >
          Update
        </Button>
      </div>
    </div>
  );
};
