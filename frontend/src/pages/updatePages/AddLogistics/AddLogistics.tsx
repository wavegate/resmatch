import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Breadcrumbs,
  Anchor,
  Checkbox,
  Textarea,
  TextInput,
  MultiSelect,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import logisticsService from "@/services/logisticsService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  schedulerPlatform: z.string().optional(),
  ivFormat: z.string().optional(),
  timeSlots: z.string().optional(),
  ivPlatform: z.string().optional(),
  openIVDates: z.date().array().optional(),
  anonymous: z.boolean(),
});

export default function AddLogistics() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous: false,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? logisticsService.updateLogistics(id, values)
        : logisticsService.createLogistics(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: logisticsData, isLoading } = useQuery({
    queryKey: ["logistics", id],
    queryFn: () => logisticsService.readLogistics(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (logisticsData) {
      const transformedData = {
        ...logisticsData,
        openIVDates: logisticsData.openIVDates
          ? logisticsData.openIVDates.map((date) => new Date(date))
          : [],
      };

      form.reset(removeNulls(transformedData));
    }
  }, [logisticsData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Interview Logistics updated successfully!"
          : "Interview Logistics added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["logistics"] });
      navigate("/logistics");
    });
  }

  const items = [
    { title: "Interview Logistics", to: "/logistics" },
    { title: isUpdate ? "Edit Logistics" : "Add Logistics" },
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
                label="Which program is this logistics for?"
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
          name="schedulerPlatform"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Scheduler Platform"
              placeholder="Enter scheduler platform"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="ivFormat"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Interview Format"
              placeholder="Enter interview format"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="timeSlots"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Time Slots"
              placeholder="Enter time slots"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="ivPlatform"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Interview Platform"
              placeholder="Enter interview platform"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="openIVDates"
          control={control}
          render={({ field, fieldState }) => (
            <DatePickerInput
              type="multiple"
              label="Open Interview Dates"
              placeholder="Pick dates"
              value={field.value}
              onChange={(dates) => field.onChange(dates)}
              error={fieldState.error?.message}
              size="md"
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
          {isUpdate ? "Update Logistics" : "Submit Logistics"}
        </Button>
      </form>
    </div>
  );
}
