import { Anchor, Breadcrumbs, Loader } from "@mantine/core";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import programService from "@/services/programService";
import programName from "@/utils/programName";
import ProgramHeader from "@/headers/ProgramHeader/ProgramHeader";
import ProgramDetails from "@/details/ProgramDetails/ProgramDetails";

const DetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["programs", id],
    queryFn: () => programService.readProgram(id),
  });

  const items = [
    { title: "Program Overview", to: `/program` },
    { title: programName(data) },
  ].map((item, index) =>
    item.to ? (
      <Link to={item.to} key={index}>
        <Anchor>{item.title}</Anchor>
      </Link>
    ) : (
      <span key={index}>{item.title}</span>
    )
  );

  return (
    <>
      <Helmet>
        <title>
          {programName(data)} | {APP_NAME}
        </title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <Breadcrumbs separator=">">{items}</Breadcrumbs>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}

        {data && (
          <div className={`border border-solid rounded-lg overflow-hidden`}>
            <ProgramHeader item={data} detailsPage />
            <ProgramDetails item={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
