export enum CommentCategory {
  SERIOUS_QUESTION = 'SERIOUS_QUESTION',
  VENT = 'VENT',
  ADVICE = 'ADVICE',
  HAPPY = 'HAPPY',
}

export const mapCommentCategoryToLabel: Record<CommentCategory, string> = {
  [CommentCategory.SERIOUS_QUESTION]: 'Serious Question',
  [CommentCategory.ADVICE]: 'Advice',
  [CommentCategory.VENT]: 'Vent',
  [CommentCategory.HAPPY]: 'Happy',
}