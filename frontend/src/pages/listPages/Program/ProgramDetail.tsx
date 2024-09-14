import { Anchor, Breadcrumbs, Loader, Title } from "@mantine/core";
import { pageDescription } from "@/schemas/pageDescription";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import services from "@/services/services";
import Details from "@/components/Details";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";

const DetailPage = () => {
  const { id } = useParams();
  const service = services[modelName];
  const { data, isLoading } = useQuery({
    queryKey: [modelName, id],
    queryFn: () => service.read(id),
  });

  const queryKey = [
    [modelName, id],
    [modelName, "all"],
  ];

  const labels = pageDescription[modelName];

  const items = [
    { title: labels.name, to: `/${modelName}` },
    { title: `Details` },
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
          {pageDescription[modelName].name} | {APP_NAME}
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
            <Header
              queryKey={queryKey}
              data={data}
              modelName={modelName}
              detailsPage
            />
            <Details modelName={modelName} queryKey={queryKey} data={data} />
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
