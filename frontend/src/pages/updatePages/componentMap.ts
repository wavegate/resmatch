import {
  TextInput,
  Checkbox,
  MultiSelect,
  Textarea,
  Button,
  NumberInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";

export const formComponentMap = {
  string: TextInput,
  number: NumberInput,
  boolean: Checkbox,
  array: MultiSelect,
  textarea: Textarea,
  date: DatePickerInput,
  programSearch: ProgramSearch,
  // Add more mappings as necessary
};
