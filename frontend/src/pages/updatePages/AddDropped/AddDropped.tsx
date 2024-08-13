import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Breadcrumbs, Anchor, Checkbox, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import droppedService from "@/services/droppedService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  dateDropped: z.date({ required_error: "Date dropped is required." }),
  dateOfInterviewCancelled: z.date().optional(),
  reason: z.string().optional(),
  anonymous: z.boolean(),
});

export default function AddDropped() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous: true,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? droppedService.updateDropped(id, values)
        : droppedService.createDropped(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: droppedData, isLoading } = useQuery({
    queryKey: ["dropped", id],
    queryFn: () => droppedService.readDropped(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (droppedData) {
      const transformedData = {
        ...droppedData,
        dateDropped: droppedData.dateDropped
          ? new Date(droppedData.dateDropped)
          : null,
        dateOfInterviewCancelled: droppedData.dateOfInterviewCancelled
          ? new Date(droppedData.dateOfInterviewCancelled)
          : null,
      };

      form.reset(removeNulls(transformedData));
    }
  }, [droppedData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Dropped entry updated successfully!"
          : "Dropped entry added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["dropped"] });
      navigate("/dropped");
    });
  }

  const items = [
    { title: "Dropped Programs", to: "/dropped" },
    { title: isUpdate ? "Edit Dropped" : "Add Dropped" },
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
                label="Which program did you drop?"
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
          name="dateDropped"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="Date you dropped the program"
              placeholder="Select a date"
              required
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="dateOfInterviewCancelled"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="Date of the interview that was cancelled (if available)"
              placeholder="Select a date"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Reason for dropping the program"
              placeholder="Optional"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="anonymous"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Post anonymously"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">
          {isUpdate ? "Update Dropped" : "Submit Dropped"}
        </Button>
      </form>
    </div>
  );
}
