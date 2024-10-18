export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "textarea"
  | "date"
  | "programSearch"
  | "multipleDates"
  | "select"
  | "comments";

export interface Option {
  label: string;
  value: string;
}

export interface FieldSchema {
  type: FieldType;
  label: string;
  of?: string;
  description?: string;
  options?: Option[];
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
  conditions?: any;
  width?: string;
}

export interface FormSchema {
  [fieldName: string]: FieldSchema;
}
