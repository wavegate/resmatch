import FilterTagSection from "@/components/FilterTagRow/FilterTagSection.tsx";
import {APP_NAME} from "@/constants";
import {
	useCommentCategoryBadgeColor
} from "@/hooks/useCommentCategoryBadgeColor.ts";
import {useFilterTagSection} from "@/hooks/useFilterTagSection.ts";
import ChatTable from "@/tables/ChatTable/ChatTable";
import {
	CommentCategory,
	mapCommentCategoryToLabel
} from "@/typings/CommentTypes";
import {Text, Title, useMantineTheme} from "@mantine/core";
import {Helmet} from "react-helmet";

const Chat = () => {
  const theme = useMantineTheme();
  const {mapCommentCategoryToBadgeColor} = useCommentCategoryBadgeColor(theme);
  const {
    selectedTagList,
    handleSelectTag
  } = useFilterTagSection({limitOneSelection: false})
  return (
    <>
      <Helmet>
        <title>Main Chat | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-2`}>
        <header>
          <Title
            order={2}
            mb={{base: "xs", md: "sm"}}
            className="text-lg sm:text-xl md:text-2xl"
          >
            Main Chat
          </Title>
          <Text
            c="dimmed"
            mb={{base: "xs", md: "sm"}}
            className="text-sm sm:text-base md:text-lg"
          >
            A place for general discussion.
          </Text>
          <FilterTagSection sectionLabel={"Filters:"}
                            tagList={Object.keys(CommentCategory)}
                            selectedTagList={selectedTagList}
                            handleSelectTag={handleSelectTag}
                            mapTagToLabel={mapCommentCategoryToLabel}
                            mapTagToBadgeColor={mapCommentCategoryToBadgeColor}/>
        </header>
        <ChatTable
          selectedCommentCategories={selectedTagList as CommentCategory[]}/>
      </div>
    </>
  );
};

export default Chat;
