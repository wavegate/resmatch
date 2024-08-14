import { Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FaRegCalendarAlt } from "react-icons/fa";

const DateModal = ({ closeDate }) => {
  return (
    <div className={`flex flex-col gap-6`}>
      <DateInput
        label="Start Date"
        placeholder="From MM/DD/YYYY to MM/DD/YYYY"
        clearable
        size="md"
        leftSection={<FaRegCalendarAlt />}
      />
      <DateInput
        label="End Date"
        placeholder="End Date"
        clearable
        size="md"
        leftSection={<FaRegCalendarAlt />}
      />
      <Button className={`w-fit self-end`} onClick={closeDate}>
        Confirm
      </Button>
    </div>
  );
};

export default DateModal;
