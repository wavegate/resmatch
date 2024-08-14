import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { FormSchema } from "./schema";
import { generateZodSchema } from "./schemas";
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
};

interface FormGeneratorProps {
  schema: FormSchema;
  onSubmit: (values: any) => void;
  resetValues?: any;
  isUpdate?: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  schema,
  onSubmit,
  resetValues,
  isUpdate = false,
}) => {
  // Generate the Zod schema within the component
  const zodSchema = generateZodSchema(schema);

  const defaultValues = Object.keys(schema).reduce((acc, key) => {
    if (schema[key].defaultValue !== undefined) {
      acc[key] = schema[key].defaultValue;
    }
    return acc;
  }, {} as Record<string, any>);

  console.log(defaultValues);

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
