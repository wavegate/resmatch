export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "textarea"
  | "date"
  | "programSearch"
  | "multipleDates"
  | "select";

export interface Option {
  label: string;
  value: string;
}

export interface FieldSchema {
  type: FieldType;
  label: string;
  description?: string;
  options?: Option[];
  required?: boolean;
  defaultValue?: any;
  placeholder?: string;
}

export interface FormSchema {
  [fieldName: string]: FieldSchema;
}