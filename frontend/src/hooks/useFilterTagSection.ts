import { useCallback, useState } from "react";

export const useFilterTagSection = ({
  limitOneSelection,
}: {
  limitOneSelection: boolean;
}) => {
  const [selectedTagList, setSelectedTags] = useState<string[]>([]);

  const handleSelectTag = useCallback(
    (tag: string) => {
      if (limitOneSelection) {
        setSelectedTags((previousTags) =>
          previousTags.includes(tag) ? [] : [tag]
        );
      } else {
        setSelectedTags((previousTags) => {
          if (previousTags.includes(tag)) {
            return previousTags.filter((prevTag) => prevTag !== tag);
          } else {
            return [...previousTags, tag];
          }
        });
      }
    },
    [limitOneSelection]
  );

  return { selectedTagList, handleSelectTag };
};
