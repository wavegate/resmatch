import programName from "@/utils/programName";
import { Badge } from "@mantine/core";
import { Link } from "react-router-dom";

interface ProgramHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function ProgramHeader({
  item,
  detailsPage,
}: ProgramHeaderProps) {
  return (
    <div
      className={`
    bg-primary bg-opacity-10 px-4 max-sm:px-3 py-2`}
    >
      <div className={`font-medium sm:text-lg`}>{programName(item)}</div>
      <div
        className={`text-sm text-gray-500 flex gap-1.5 items-center flex-wrap`}
      >
        <div className={`flex gap-4 items-center`}>
          {!detailsPage && (
            <Link
              to={`/program/${item.id}/details`}
              className={`text-sm underline`}
            >
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
