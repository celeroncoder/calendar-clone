// This is the popover Content

import { useState } from "react";
import { CalendarDatePickerWithPresets } from "~/components/ui/DatePicker";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

const generateTimeSlots = () => {
  let timeSlots = new Array<string>(18).fill("");

  timeSlots.forEach((_, idx) => {
    timeSlots[idx] = `${idx + 6}:00 - ${idx + 7}:00`;
  });

  return timeSlots;
};

export const NewAppointment: React.FC<{
  current: Date;
  weekDates: string[];
  idxDay: number;
  idxHr: number;
  close: () => void;
}> = ({ current, weekDates, idxDay, idxHr, close }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | undefined>(() => {
    current.setDate(
      parseInt(weekDates[idxDay]!.slice(weekDates[idxDay]!.length - 2))
    );
    return current;
  });

  const [timeSlots] = useState<string[]>(generateTimeSlots());
  const [timeSlot, setTimeSlot] = useState<string>(timeSlots[idxHr]!);

  const [service, setService] = useState("");
  const [serviceFee, setServiceFee] = useState(100);
  const [location, setLocation] = useState<string | undefined>();

  const { mutateAsync: createEvent } = api.event.create.useMutation();

  const { toast: showNotification } = useToast();

  const submit = async () => {
    const result = await createEvent({
      clientName: name,
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
        title: "Appointment Set!",
        description: "The Appointment has been saved successfully!",
      });
    }
    close();
  };

  return (
    <div className="flex flex-col gap-2 px-2">
      {/* title */}
      <div className="space-y-2">
        <h4 className="font-medium leading-none">New Appointment</h4>
        <p className="text-sm text-muted-foreground">
          Create a new Client Appointment
        </p>
      </div>

      {/* Client Name */}
      <div className="space-y-1">
        <Label htmlFor="clientname">Client Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="clientname"
          placeholder="John Doe"
        />
      </div>

      {/* DatePicker */}
      <div className="space-y-1">
        <Label>Date</Label>
        <CalendarDatePickerWithPresets date={date!} setDate={setDate} />
      </div>

      {/* Time Slot Picker */}
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

        <p className="text-sm text-muted-foreground">Pick a time slot.</p>
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
        <p className="text-sm text-muted-foreground">
          Specify the Service Name.
        </p>
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
        <p className="text-sm text-muted-foreground">
          Please Specify the Location.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button onClick={close} variant="ghost">
          Cancel
        </Button>
        <Button
          onClick={submit}
          disabled={service.length == 0 || name.length == 0}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
