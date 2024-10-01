import { CommentCategory } from "@/typings/CommentTypes.ts";
import { MantineColor, MantineTheme } from "@mantine/core";

export const useCommentCategoryBadgeColor = (theme: MantineTheme) => {
  const mapCommentCategoryToBadgeColor: Record<CommentCategory, MantineColor> =
    {
      [CommentCategory.SERIOUS_QUESTION]: theme.colors.violet[6],
      [CommentCategory.VENT]: theme.colors.red[6],
      [CommentCategory.ADVICE]: theme.colors.green[6],
      [CommentCategory.HAPPY]: theme.colors.pink[6],
    };
  return { mapCommentCategoryToBadgeColor };
};
