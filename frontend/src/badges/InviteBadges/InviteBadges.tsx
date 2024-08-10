import { Badge } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";

interface InviteBadgesProps {
  startDate: Date | null;
  endDate: Date | null;
  selectedProgram: any; // Replace with proper type if available
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setSelectedProgram: (program: any) => void; // Replace with proper type if available
}

export default function InviteBadges({
  startDate,
  endDate,
  selectedProgram,
  setStartDate,
  setEndDate,
  setSelectedProgram,
}: InviteBadgesProps) {
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
