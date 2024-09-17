import { useEffect, useRef, useState } from "react";
import { Button, Title } from "@mantine/core";
import Table from "@/tables/Table";
import { pageDescription } from "@/schemas/pageDescription";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

interface ListPageProps {
  modelName: string;
  subtitle?: string;
  className?: string;
}

const ListPage: React.FC<ListPageProps> = ({ modelName, className }) => {
  const matches = useMediaQuery("(max-width: 768px)");
  const [listView, setListView] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current && matches !== undefined) {
      setListView(matches);
      firstLoad.current = false;
    }
  }, [matches]);

  const navigate = useNavigate();

  const labels = pageDescription[modelName];

  const shareUrl = `/${modelName}/add`;
  const shareText = `Share`;

  return (
    <>
      <Helmet>
        <title>
          {pageDescription[modelName].name} | {APP_NAME}
        </title>
      </Helmet>
      <div className={`flex flex-col gap-0 absolute program-page`}>
        <header
          className={`flex max-sm:justify-between items-center gap-x-2 sm:gap-x-8 flex-wrap max-sm:!mb-0.5 sm:!mb-2`}
        >
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl !mb-0"
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
          <Button
            onClick={() => navigate(shareUrl)}
            leftSection={<IoMdAdd size={18} />}
            visibleFrom="sm"
          >
            {shareText}
          </Button>
          <Button
            onClick={() => navigate(shareUrl)}
            leftSection={<IoMdAdd size={18} />}
            hiddenFrom="sm"
            size="xs"
          >
            {shareText}
          </Button>
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
