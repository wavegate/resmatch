import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Breadcrumbs,
  Anchor,
  Textarea,
  TextInput,
  Checkbox,
} from "@mantine/core";

import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import secondLookService from "@/services/secondLookService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import { DateInput } from "@mantine/dates";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  setting: z.string().optional(),
  date: z.date().optional(),
  bearingOnRank: z.string().optional(),
  linked: z.boolean(),
});

export default function AddSecondLook() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linked: false, // Default linked to false
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? secondLookService.updateSecondLook(id, values)
        : secondLookService.createSecondLook(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: secondLookData, isLoading } = useQuery({
    queryKey: ["secondLook", id],
    queryFn: () => secondLookService.readSecondLook(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (secondLookData) {
      // Transform dates into Date objects
      const transformedData = {
        ...removeNulls(secondLookData),
        date: secondLookData.date ? new Date(secondLookData.date) : null,
      };
      form.reset(transformedData);
    }
  }, [secondLookData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Second Look updated successfully!"
          : "Second Look added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["secondLook"] });
      navigate("/second-look"); // Singular navigation path
    });
  }

  const items = [
    { title: "Second Looks", to: "/second-look" },
    { title: isUpdate ? "Edit Second Look" : "Add Second Look" },
  ].map((item, index) =>
    item.to ? (
      <Link to={item.to} key={index}>
        <Anchor>{item.title}</Anchor>
      </Link>
    ) : (
      <span key={index}>{item.title}</span>
    )
  );

  return (
    <div className={`flex flex-col gap-4`}>
      <Breadcrumbs separator=">">{items}</Breadcrumbs>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4`}>
        <Controller
          name="programId"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <div>
              <ProgramSearch
                required
                selected={value}
                onChange={onChange}
                label="Which program is this Second Look for?"
              />
              {fieldState.error && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {fieldState.error.message}
                </div>
              )}
            </div>
          )}
        />

        <Controller
          name="setting"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Setting"
              placeholder="Enter the setting of the Second Look"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="Date"
              placeholder="Select the date of the Second Look"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="bearingOnRank"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Bearing on Rank"
              placeholder="Describe how the Second Look affected your rank"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="linked"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Link this Second Look to my profile."
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">
          {isUpdate ? "Update Second Look" : "Submit Second Look"}
        </Button>
      </form>
    </div>
  );
}
