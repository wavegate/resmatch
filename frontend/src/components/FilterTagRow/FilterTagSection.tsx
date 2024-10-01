import { Badge, MantineColor, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface FilterTagSectionProps {
  sectionLabel: string;
  tagList: string[];
  selectedTagList: string[];
  handleSelectTag: (tag: string) => void;
  mapTagToLabel: Record<string, string>;
  mapTagToBadgeColor?: Record<string, MantineColor>;
}

const FilterTagSection = ({
  sectionLabel,
  tagList,
  selectedTagList,
  handleSelectTag,
  mapTagToLabel,
  mapTagToBadgeColor,
}: FilterTagSectionProps) => {
  const theme = useMantineTheme();

  return (
    <div className={`flex items-center flex-wrap gap-1`}>
      <Text c="dimmed">{sectionLabel}</Text>
      {tagList.map((tag, i) => {
        const selected = selectedTagList.includes(tag);
        const selectedColor: MantineColor =
          (mapTagToBadgeColor && mapTagToBadgeColor[tag]) ||
          theme.colors.blue[6];
        return (
          <Badge
            key={i}
            className="cursor-pointer hover:bg-slate-600"
            color={selected ? selectedColor : theme.colors.gray[6]}
            onClick={() => handleSelectTag(tag)}
            rightSection={selected && <IoMdClose size={16} />}
          >
            {mapTagToLabel[tag]}
          </Badge>
        );
      })}
    </div>
  );
};

export default FilterTagSection;
