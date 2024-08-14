import { Avatar, Button } from "@mantine/core";
import { HiDotsVertical } from "react-icons/hi";
const tags = [
  "MD +4",
  "DO +2",
  "PSTP +2",
  "US +4",
  "IMG +4",
  "OOS +2",
  "Geographically Preferred +1",
  "Signal +1",
];

const textColor = {
  green: "text-lime-700",
  yellow: "text-yellow-700",
  red: "text-red-700",
};

const bgColor = {
  green: "bg-lime-100",
  red: "bg-red-100",
  yellow: "bg-yellow-100",
};

const Entry = ({ color }) => {
  return (
    <div className={`flex justify-between gap-6 items-center`}>
      <div
        className={`${bgColor[color]} rounded-lg p-4 flex flex-col ${textColor[color]} items-center font-medium`}
      >
        <div>Oct 11</div>
        <div className={`text-xs`}>2024</div>
      </div>
      <div className={`flex flex-col gap-2 flex-grow`}>
        <div className={`text-black text-xl`}>
          Internal Medicine at UC Davis
        </div>
        <div className={`flex text-gray-800 text-sm items-center gap-1`}>
          <div className={`flex items-center`}>
            <Avatar size="20"></Avatar>
            <div>username</div>
          </div>
          <div className={`flex items-center`}>
            <Avatar size="20"></Avatar>
            <div>username</div>
          </div>
          <div>
            and <strong>5 more</strong>
          </div>
        </div>
      </div>
      <div className={`flex gap-2 flex-wrap max-w-[450px] h-fit`}>
        {tags.map((tag) => {
          return (
            <div
              className={`py-1 px-2 bg-gray-100 rounded-full text-xs text-[#495057] `}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <Button
        variant="light"
        size="compact-lg"
        color="gray"
        className={`text-black px-2`}
      >
        <HiDotsVertical />
      </Button>
    </div>
  );
};

export default Entry;
