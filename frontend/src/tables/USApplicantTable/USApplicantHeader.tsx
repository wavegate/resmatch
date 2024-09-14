import React from "react";
import { Avatar } from "@mantine/core";
import { Link } from "react-router-dom";
import { generateGravatarUrl } from "@/utils/utils";

interface DataDisplayProps {
  data: any;
  modelName: string; // The name of the model, e.g., "interviewLogistics"
  i: number;
  queryKey: any;
}

const Header: React.FC<DataDisplayProps> = ({ data }) => {
  return (
    <div className={`bg-primary bg-opacity-10 px-4 py-2 max-sm:px-3`}>
      <div className={`flex flex-col gap-1`}>
        <div className={`font-medium sm:text-lg`}>
          <Link
            to={`/user/${data.id}`}
            className="underline flex gap-2 items-center"
          >
            <Avatar
              size="16"
              src={generateGravatarUrl(String(data?.id) || "", 40)}
            />
            <div>{data?.alias || "-"}</div>
          </Link>
        </div>
        {/* Display user alias or 'Anonymous' */}
        {/* <div
          className={`text-sm text-gray-500 flex gap-1.5 items-center flex-wrap`}
        >
          {data.alias}
          <div>·</div>
          <div>{dayjs(data.createdAt).format("M/D/YYYY [at] ha")}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
