import { TbMoodSad } from "react-icons/tb";

export default () => {
  return (
    <div className={`text-gray-400 flex flex-col gap-2 items-center mt-8`}>
      <TbMoodSad size={36} />
      <div className={`text-sm`}>No records found.</div>
    </div>
  );
};
