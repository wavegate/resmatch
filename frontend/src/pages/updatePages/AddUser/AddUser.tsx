import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Checkbox,
  Button,
  Breadcrumbs,
  Anchor,
  Loader,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import userService from "@/services/userService";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import { generateZodSchema } from "@/schemas/schemas";
import userProfileFormSchema from "@/schemas/userProfileFormSchema";
import { formComponentMap } from "../FormGenerator";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { DatePickerInput } from "@mantine/dates";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";

export default function AddUser() {
  const schema = userProfileFormSchema;
  const formSchema = generateZodSchema(schema);
  const { id } = useParams();
  useAuthGuard({ id: Number(id) });
  const isUpdate = !!id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      public: true,
    },
  });

  const { control, handleSubmit, watch } = form;
  const watchAllFields = watch();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? userService.updateUser(id, values)
        : userService.createUser(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.readUser(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (userData) {
      form.reset(removeNulls(userData));
    }
  }, [userData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then((res) => {
      notifications.show({
        message: isUpdate
          ? "User updated successfully!"
          : "User added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile");
    });
  }

  const items = [
    { title: "Profile", to: "/profile" },
    { title: "Edit Profile" },
  ].map((item, index) =>
    item.to ? (
      <Link to={item.to} key={index}>
        <Anchor>{item.title}</Anchor>
      </Link>
    ) : (
      <span key={index}>{item.title}</span>
    )
  );

  const checkConditions = (conditions: Record<string, any>) => {
    if (!conditions) return true;
    return Object.keys(conditions).every(
      (key) => watchAllFields[key] === conditions[key]
    );
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-4`}>
        <Breadcrumbs separator=">">{items}</Breadcrumbs>
        {isLoading ? (
          <Loader className={`w-full flex justify-center mt-12`} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {Object.keys(schema).map((fieldName) => {
              const fieldSchema = schema[fieldName];

              if (
                fieldName === "comments" ||
                !checkConditions(fieldSchema.conditions)
              ) {
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
                          required={fieldSchema.required}
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
                            required={fieldSchema.required}
                          />
                        );
                      }

                      return (
                        <DatePickerInput
                          {...commonProps}
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          placeholder="Pick a date"
                          required={fieldSchema.required}
                        />
                      );
                    }

                    // Handle Select field type
                    if (fieldSchema.type === "select") {
                      const options = Object.keys(
                        fieldLabelMap[fieldName] || {}
                      ).map((value) => ({
                        label: fieldLabelMap[fieldName][value],
                        value,
                      }));

                      return (
                        <Component
                          {...commonProps}
                          data={options}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={
                            commonProps.placeholder || "Click to select"
                          }
                          required={fieldSchema.required}
                        />
                      );
                    }

                    return <Component {...commonProps} />;
                  }}
                />
              );
            })}

            <Button type="submit">Update</Button>
          </form>
        )}
      </div>
    </>
  );
}
