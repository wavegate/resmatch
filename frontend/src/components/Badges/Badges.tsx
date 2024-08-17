import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import { IoMdClose } from "react-icons/io";

export default function Badges({
  startDate,
  endDate,
  selectedProgram,
  setStartDate,
  setEndDate,
  setSelectedProgram,
}) {
  return (
    <div className="inline-flex gap-1 mt-2">
      {startDate && !endDate && (
        <Badge rightSection={<IoMdClose onClick={() => setStartDate(null)} />}>
          {`After ${dayjs(startDate).format("M/DD/YYYY")}`}
        </Badge>
      )}
      {!startDate && endDate && (
        <Badge rightSection={<IoMdClose onClick={() => setEndDate(null)} />}>
          {`Before ${dayjs(endDate).format("M/DD/YYYY")}`}
        </Badge>
      )}
      {startDate && endDate && (
        <Badge
          rightSection={
            <IoMdClose
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
            />
          }
        >
          {`${dayjs(startDate).format("M/DD/YYYY")} - ${dayjs(endDate).format(
            "M/DD/YYYY"
          )}`}
        </Badge>
      )}
      {selectedProgram && (
        <Badge
          rightSection={<IoMdClose onClick={() => setSelectedProgram(null)} />}
        >
          {`${selectedProgram.name} at ${selectedProgram.institution.name}`}
        </Badge>
      )}
    </div>
  );
}
