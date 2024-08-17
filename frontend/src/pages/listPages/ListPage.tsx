import React from "react";
import { Text, Title } from "@mantine/core";
import Table from "@/tables/Table";
import { pageDescription } from "@/schemas/pageDescription";

interface ListPageProps {
  modelName: string;
  subtitle?: string;
  className?: string;
}

const ListPage: React.FC<ListPageProps> = ({ modelName, className }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          {pageDescription[modelName].name}
        </Title>
        {modelName && (
          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            {pageDescription[modelName].description}
          </Text>
        )}
      </header>
      <Table modelName={modelName} key={modelName} />
    </div>
  );
};

export default ListPage;
