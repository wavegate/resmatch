import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Breadcrumbs,
  Anchor,
  Textarea,
  Checkbox,
  Select,
  TextInput,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import scheduleDetailsService from "@/services/scheduleDetailsService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  longOvernightCall: z.string().optional(),
  scheduleContinuity: z.string().optional(),
  locations: z.string().optional(),
  emr: z.string().optional(),
  startDateOrientation: z.date().optional(),
  visaInfo: z.string().optional(),
  union: z.string().optional(),
  midlevel: z.string().optional(),
  ancillary: z.string().optional(),
  teamRatios: z.string().optional(),
  internCap: z.string().optional(),
  admittingSystem: z.string().optional(),
  icuHours: z.string().optional(),
  nightFloat: z.string().optional(),
  sickCallSystem: z.string().optional(),
  moonlighting: z.string().optional(),
  stayUntilSignout: z.string().optional(),
  didactics: z.string().optional(),
  vacationHolidays: z.string().optional(),
  gym: z.string().optional(),
  food: z.string().optional(),
  salary: z.string().optional(),
  anonymous: z.boolean().default(true),
});

export default function AddScheduleDetails() {
  useAuthGuard();
  const { id } = useParams();
  const isUpdate = !!id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous: true,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? scheduleDetailsService.updateScheduleDetails(id, values)
        : scheduleDetailsService.createScheduleDetails(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: scheduleDetailsData, isLoading } = useQuery({
    queryKey: ["scheduleDetails", id],
    queryFn: () => scheduleDetailsService.readScheduleDetails(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (scheduleDetailsData) {
      const transformedData = removeNulls(scheduleDetailsData);
      if (transformedData.startDateOrientation) {
        transformedData.startDateOrientation = new Date(
          transformedData.startDateOrientation
        );
      }
      form.reset({
        ...transformedData,
        linked: transformedData.linked ?? false,
      });
    }
  }, [scheduleDetailsData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Schedule details updated successfully!"
          : "Schedule details added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["scheduleDetails"] });
      navigate("/schedule-details");
    });
  }

  const items = [
    { title: "Schedule Details", to: "/schedule-details" },
    { title: isUpdate ? "Edit Schedule Details" : "Add Schedule Details" },
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
          render={({ field, fieldState }) => (
            <ProgramSearch
              required
              selected={field.value}
              onChange={field.onChange}
              label="For which program is this schedule details?"
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="longOvernightCall"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Long Overnight Call"
              placeholder="Describe the overnight call schedule"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="scheduleContinuity"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Schedule Continuity"
              placeholder="Describe the schedule continuity"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="locations"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Locations"
              placeholder="Describe the different locations"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="emr"
          control={control}
          render={({ field }) => (
            <TextInput
              label="EMR"
              placeholder="Enter the EMR system used"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="startDateOrientation"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="Start Date Orientation"
              placeholder="Select a date"
              size="md"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="visaInfo"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Visa Information"
              placeholder="Enter visa information if applicable"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="union"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Union"
              placeholder="Describe the union"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="midlevel"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Midlevel"
              placeholder="Describe the role of midlevel providers"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="ancillary"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Ancillary"
              placeholder="Describe the ancillary support"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="teamRatios"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Team Ratios"
              placeholder="Enter team ratios"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="internCap"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Intern Cap"
              placeholder="Enter the intern cap"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="admittingSystem"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Admitting System"
              placeholder="Describe the admitting system"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="icuHours"
          control={control}
          render={({ field }) => (
            <Textarea
              label="ICU Hours"
              placeholder="Describe ICU hours"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="nightFloat"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Night Float"
              placeholder="Describe the night float system"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="sickCallSystem"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Sick Call System"
              placeholder="Describe the sick call system"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="moonlighting"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Moonlighting"
              placeholder="Describe moonlighting opportunities"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="stayUntilSignout"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Stay Until Signout"
              placeholder="Describe the sign-out system"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="didactics"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Didactics"
              placeholder="Describe didactics"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="vacationHolidays"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Vacation & Holidays"
              placeholder="Describe vacation and holiday schedule"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="gym"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Gym"
              placeholder="Describe gym facilities"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="food"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Food"
              placeholder="Describe food availability"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Salary"
              placeholder="Enter salary information"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="startDateOrientation"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="Start Date Orientation"
              placeholder="Select a date"
              size="md"
              error={fieldState.error?.message}
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

        <Button type="submit" loading={isPending}>
          {isUpdate ? "Update Schedule Details" : "Submit Schedule Details"}
        </Button>
      </form>
    </div>
  );
}
