export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "textarea"
  | "date"
  | "programSearch"
  | "multipleDates";

export interface FieldSchema {
  type: FieldType;
  label: string;
  description?: string;
  options?: string[]; // For dropdowns or multi-selects
  required?: boolean;
  defaultValue?: any;
}

export interface FormSchema {
  [fieldName: string]: FieldSchema;
}
