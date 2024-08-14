import { z } from "zod";
import { numericNull } from "@/utils/zodHelpers";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Breadcrumbs,
  Anchor,
  Checkbox,
  Collapse,
  NumberInput,
  Select,
  Switch,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import inviteService from "@/services/inviteService";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { removeNulls } from "@/utils/processObjects";
import useUser from "@/hooks/useUser";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  inviteDateTime: z.date({ required_error: "An invitation date is required." }),
  signal: z.boolean().optional(),
  anonymous: z.boolean(),
  geographicPreference: z.boolean().optional(),
  locationState: z.string().optional(),
  step1ScorePass: z.boolean().optional(),
  step1Score: numericNull,
  step2Score: numericNull,
  comlex1ScorePass: z.boolean().optional(),
  comlex2Score: numericNull,
  visaRequired: z.boolean().optional(),
  subI: z.boolean().optional(),
  home: z.boolean().optional(),
  yearOfGraduation: numericNull,
  greenCard: z.boolean().optional(),
  away: z.boolean().optional(),
  graduateType: z.string().optional(),
  img: z.string().optional(),
  medicalDegree: z.string().optional(),
});

export default function AddModal() {
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
        ? inviteService.updateInvite(id, values)
        : inviteService.createInvite(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: inviteData, isLoading } = useQuery({
    queryKey: ["invite", id],
    queryFn: () => inviteService.readInvite(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (inviteData) {
      const transformedData = {
        ...inviteData,
        inviteDateTime: inviteData.inviteDateTime
          ? new Date(inviteData.inviteDateTime)
          : null,
      };
      form.reset(removeNulls(transformedData));
    }
  }, [inviteData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Invite updated successfully!"
          : "Invite added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["invite"] });
      navigate("/invite");
    });
  }

  const items = [
    { title: "Interview Invites", to: "/invite" },
    { title: isUpdate ? "Edit Invite" : "Share Invite" },
  ].map((item, index) =>
    item.to ? (
      <Link to={item.to} key={index}>
        <Anchor>{item.title}</Anchor>
      </Link>
    ) : (
      <span key={index}>{item.title}</span>
    )
  );

  const [showExtra, setShowExtra] = useState(false);

  const { user } = useUser();

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userService.readUser(user.id),
  });

  const handleImport = () => {
    if (userData) {
      const formValues = form.getValues();
      Object.assign(formValues, removeNulls(userData));
      form.reset(formValues);
    }
  };

  return (
    <div className={`flex flex-col gap-4`}>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-6`}>
        <Controller
          name="programId"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <div>
              <ProgramSearch
                required
                selected={value}
                onChange={onChange}
                label="For which program were you invited to interview?"
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
          name="inviteDateTime"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="On what day did you receive the invite?"
              placeholder="Select a date"
              required
              error={fieldState.error?.message}
              size="md"
              value={field.value ? new Date(field.value) : null} // Ensure value is a Date object
              onChange={(date) => field.onChange(date)} // Pass Date object directly
            />
          )}
        />

        <Controller
          name="anonymous"
          control={control}
          render={({ field }) => (
            <Switch
              label="Post anonymously"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button
          onClick={() => setShowExtra((prev) => !prev)}
          variant="subtle"
          className={`w-fit font-normal`}
          leftSection={showExtra ? <IoChevronUp /> : <IoChevronDown />}
        >
          Add more details
        </Button>
        <Collapse in={showExtra} className={`flex flex-col gap-4`}>
          <Button
            onClick={handleImport}
            variant="outline"
            className={`font-normal w-fit`}
          >
            Fill from my profile
          </Button>
          <Controller
            name="signal"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="I signalled to this program."
                {...field}
                checked={field.value}
                size="md"
              />
            )}
          />

          <Controller
            name="geographicPreference"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="This program is in a geographically preferred location."
                {...field}
                checked={field.value}
                size="md"
              />
            )}
          />

          <Controller
            name="graduateType"
            control={control}
            render={({ field }) => (
              <Select
                label="Are you a US medical graduate or IMG?"
                placeholder="Click to select"
                data={["US", "IMG"]}
                size="md"
                {...field}
              />
            )}
          />

          {form.watch("graduateType") === "US" && (
            <Controller
              name="medicalDegree"
              control={control}
              render={({ field }) => (
                <Select
                  label="Are you an MD or DO applicant?"
                  placeholder="Enter medical degree"
                  data={["MD", "DO"]}
                  size="md"
                  {...field}
                />
              )}
            />
          )}

          {form.watch("graduateType") === "US" && (
            <Controller
              name="locationState"
              control={control}
              render={({ field }) => (
                <Select
                  label="Are you in or out of state for this program?"
                  placeholder="Enter option"
                  data={["IS", "OOS"]}
                  size="md"
                  {...field}
                />
              )}
            />
          )}

          {form.watch("graduateType") === "US" && (
            <Controller
              name="home"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="This is my home program."
                  {...field}
                  checked={field.value}
                  size="md"
                />
              )}
            />
          )}
          <Controller
            name="away"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="I completed an away at this program."
                {...field}
                checked={field.value}
                size="md"
              />
            )}
          />
          <Controller
            name="subI"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="I completed a subI at this program."
                {...field}
                checked={field.value}
                size="md"
              />
            )}
          />
          {form.watch("graduateType") === "IMG" && (
            <Controller
              name="img"
              control={control}
              render={({ field }) => (
                <Select
                  label="Are you a US IMG or non-US IMG?"
                  placeholder="Enter option"
                  data={["USIMG", "nonUSIMG"]}
                  size="md"
                  {...field}
                />
              )}
            />
          )}

          {form.watch("graduateType") === "IMG" && (
            <Controller
              name="visaRequired"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="I require Visa sponsorship."
                  {...field}
                  checked={field.value}
                  size="md"
                />
              )}
            />
          )}
          {form.watch("graduateType") === "IMG" && (
            <Controller
              name="greenCard"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="I have a green card."
                  {...field}
                  checked={field.value}
                  size="md"
                />
              )}
            />
          )}

          <Controller
            name="yearOfGraduation"
            control={control}
            render={({ field }) => (
              <NumberInput label="Year of Graduation" {...field} size="md" />
            )}
          />

          <Controller
            name="step1ScorePass"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Have you passed Step 1?"
                {...field}
                checked={field.value}
                size="md"
              />
            )}
          />

          <Controller
            name="step1Score"
            control={control}
            render={({ field }) => (
              <NumberInput
                description="Ignore this field if you took Step 1 after the transition to
                    Pass/Fail. Your score will be displayed in a range, such as 25X."
                label="Step 1 Score"
                placeholder="Enter Step 1 Score"
                min={1}
                max={300}
                size="md"
                {...field}
              />
            )}
          />

          <Controller
            name="step2Score"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="Step 2 CK Score"
                placeholder="Enter Step 2 Score"
                min={1}
                max={300}
                size="md"
                {...field}
              />
            )}
          />
          {form.watch("medicalDegree") === "DO" && (
            <Controller
              name="comlex1ScorePass"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="Have you passed COMLEX 1?"
                  {...field}
                  checked={field.value}
                />
              )}
            />
          )}
          {form.watch("medicalDegree") === "DO" && (
            <Controller
              name="comlex2Score"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="COMLEX 2 Score"
                  placeholder="Enter COMLEX 2 Score"
                  min={9}
                  max={999}
                  {...field}
                />
              )}
            />
          )}
        </Collapse>

        <Button type="submit" className={`w-fit self-end`}>
          {isUpdate ? "Update Invite" : "Add Invitation"}
        </Button>
      </form>
    </div>
  );
}
