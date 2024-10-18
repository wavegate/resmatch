import FilterTagSection from "@/components/FilterTagRow/FilterTagSection.tsx";
import { APP_NAME } from "@/constants";
import { useCommentCategoryBadgeColor } from "@/hooks/useCommentCategoryBadgeColor.ts";
import { useFilterTagSection } from "@/hooks/useFilterTagSection.ts";
import ChatTable from "@/tables/ChatTable/ChatTable";
import {
  CommentCategory,
  mapCommentCategoryToLabel,
} from "@/typings/CommentTypes";
import { Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Chat = () => {
  const theme = useMantineTheme();
  const { mapCommentCategoryToBadgeColor } =
    useCommentCategoryBadgeColor(theme);
  const { selectedTagList, handleSelectTag } = useFilterTagSection({
    limitOneSelection: false,
  });
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebouncedValue(searchText, 500);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    setPageNum(1);
  }, [selectedTagList, searchValue]);

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
          <div className={`flex flex-col gap-2`}>
            <FilterTagSection
              sectionLabel={"Filters:"}
              tagList={Object.keys(CommentCategory)}
              selectedTagList={selectedTagList}
              handleSelectTag={handleSelectTag}
              mapTagToLabel={mapCommentCategoryToLabel}
              mapTagToBadgeColor={mapCommentCategoryToBadgeColor}
            />
            <TextInput
              size="md"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.currentTarget.value);
              }}
              className={`mb-2`}
            />
          </div>
        </header>
        <ChatTable
          selectedCommentCategories={selectedTagList as CommentCategory[]}
          searchValue={searchValue}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </div>
    </>
  );
};

export default Chat;
