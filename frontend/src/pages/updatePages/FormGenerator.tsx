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
import { generateZodSchema, schemas } from "../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericList from "@/components/List";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";

const formComponentMap = {
  string: TextInput,
  number: NumberInput,
  boolean: Checkbox,
  array: MultiSelect, // We will override this for arrays of strings
  textarea: Textarea,
  date: DatePickerInput,
  multipleDates: DatePickerInput,
  programSearch: ProgramSearch,
  select: Select,
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
  const zodSchema = generateZodSchema(schema);

  const defaultValues = Object.keys(schema).reduce((acc, key) => {
    if (schema[key].defaultValue !== undefined) {
      acc[key] = schema[key].defaultValue;
    }
    return acc;
  }, {} as Record<string, any>);

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

        if (fieldName === "comments") {
          return null;
        }
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
                placeholder: fieldSchema.placeholder || "",
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

              // Handle ProgramSearch component
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

              // Handle DatePickerInput component
              if (Component === DatePickerInput) {
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
                    placeholder={commonProps.placeholder || "Click to select"}
                  />
                );
              }

              // Handle array of strings with GenericList
              if (fieldSchema.type === "array" && fieldSchema.of === "string") {
                return (
                  <GenericList<string>
                    initialItems={field.value || []}
                    onItemsChange={field.onChange}
                    getItemId={(item) => item}
                    renderItem={(item, index, removeItem) => (
                      <>
                        <div>{item}</div>
                        <Button
                          size="xs"
                          variant="outline"
                          color="red"
                          onClick={() => removeItem(item)}
                        >
                          Remove
                        </Button>
                      </>
                    )}
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
