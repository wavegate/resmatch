import { APP_NAME } from "@/constants";
import ChatTable from "@/tables/ChatTable/ChatTable";
import { Text, Title } from "@mantine/core";
import { Helmet } from "react-helmet";

export default () => {
  return (
    <>
      <Helmet>
        <title>Main Chat | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-2`}>
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            Main Chat
          </Title>
          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            A place for general discussion.
          </Text>
        </header>
        <ChatTable />
      </div>
    </>
  );
};
