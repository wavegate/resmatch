import { useState } from "react";
import { Title } from "@mantine/core";
import Table from "@/tables/Table";
import { pageDescription } from "@/schemas/pageDescription";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";

interface ListPageProps {
  modelName: string;
  subtitle?: string;
  className?: string;
}

const ListPage: React.FC<ListPageProps> = ({ modelName, className }) => {
  const [listView, setListView] = useState(false);
  return (
    <>
      <Helmet>
        <title>
          {pageDescription[modelName].name} | {APP_NAME}
        </title>
      </Helmet>
      <div className={`flex flex-col gap-0 absolute program-page`}>
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            {pageDescription[modelName].name}
          </Title>
          {/* {modelName && (
          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            {pageDescription[modelName].description}
          </Text>
        )} */}
        </header>
        <Table
          listView={listView}
          setListView={setListView}
          modelName={modelName}
          key={modelName}
        />
      </div>
    </>
  );
};

export default ListPage;
