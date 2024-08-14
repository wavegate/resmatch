import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Checkbox,
  MultiSelect,
  Textarea,
  Button,
  NumberInput,
  Select,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { FormSchema } from "./schema";
import { fieldLabelMap, generateZodSchema, schemas } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const formComponentMap = {
  string: TextInput,
  number: NumberInput,
  boolean: Checkbox,
  array: MultiSelect,
  textarea: Textarea,
  date: DatePickerInput,
  multipleDates: DatePickerInput,
  programSearch: ProgramSearch,
  select: Select, // For single selection
};

interface FormGeneratorProps {
  modelName: string;
  onSubmit: (values: any) => void;
  resetValues?: any;
  isUpdate?: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  modelName,
  onSubmit,
  resetValues,
  isUpdate = false,
}) => {
  const schema = schemas[modelName];
  // Generate the Zod schema within the component
  const zodSchema = generateZodSchema(schema);

  const defaultValues = Object.keys(schema).reduce((acc, key) => {
    if (schema[key].defaultValue !== undefined) {
      acc[key] = schema[key].defaultValue;
    }
    return acc;
  }, {} as Record<string, any>);

  // Use the zodResolver with the generated Zod schema
  const form = useForm({
    defaultValues,
    resolver: zodResolver(zodSchema),
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (resetValues) {
      reset(resetValues);
    }
  }, [resetValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {Object.keys(schema).map((fieldName) => {
        const fieldSchema = schema[fieldName];
        const Component = formComponentMap[fieldSchema.type] || TextInput;

        return (
          <Controller
            key={fieldName}
            name={fieldName}
            control={control}
            render={({ field, fieldState }) => {
              const commonProps = {
                label: fieldSchema.label,
                description: fieldSchema.description,
                error: fieldState.error?.message,
                size: "md",
                placeholder: fieldSchema.placeholder || "", // Handle placeholder
                ...field,
              };

              // Special handling for Checkbox (boolean)
              if (Component === Checkbox) {
                return (
                  <Checkbox
                    {...commonProps}
                    checked={field.value}
                    onChange={(event) =>
                      field.onChange(event.currentTarget.checked)
                    }
                  />
                );
              }

              if (Component === ProgramSearch) {
                return (
                  <div>
                    <ProgramSearch
                      {...commonProps}
                      selected={field.value}
                      onChange={field.onChange}
                      required={fieldSchema.required}
                    />
                    {fieldState.error && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {fieldState.error.message}
                      </div>
                    )}
                  </div>
                );
              }

              if (Component === DatePickerInput) {
                // Check if it's a multiple date picker
                if (fieldSchema.type === "multipleDates") {
                  return (
                    <DatePickerInput
                      {...commonProps}
                      type="multiple"
                      value={field.value}
                      onChange={(dates) => field.onChange(dates)}
                      placeholder="Pick multiple dates"
                    />
                  );
                }

                return (
                  <DatePickerInput
                    {...commonProps}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholder="Pick a date"
                  />
                );
              }

              // Handle Select field type
              if (fieldSchema.type === "select") {
                const options = Object.keys(fieldLabelMap[fieldName] || {}).map(
                  (value) => ({
                    label: fieldLabelMap[fieldName][value],
                    value,
                  })
                );

                return (
                  <Component
                    {...commonProps}
                    data={options}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }

              return <Component {...commonProps} />;
            }}
          />
        );
      })}

      <Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
    </form>
  );
};

export default FormGenerator;
