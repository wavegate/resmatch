import { z } from "zod";
import { numericNull } from "@/utils/zodHelpers";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Checkbox,
  Textarea,
  Button,
  Select,
  NumberInput,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import apiClient from "@/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";

const formSchema = z.object({
  anonymous: z.boolean().optional(),
  programId: z.number({ required_error: "Program is required." }),
  inviteDateTime: z.date({ required_error: "An invitation date is required." }),
  signal: z.boolean().optional(),
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

export default () => {
  useAuthGuard();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit } = form;

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (values) => {
      return apiClient.post("/interview-invites", values);
    },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync(values).then((res) => {
      notifications.show({
        message: "Interview invite added",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/interview-invites");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4`}>
      <Controller
        name="programId"
        control={control}
        render={({ field: { onChange, value }, fieldState }) => (
          <div>
            <ProgramSearch
              required
              selected={value}
              onProgramSelect={onChange}
              label="For which program were you invited to interview for?"
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
          <DatePickerInput
            label="On what day did you receive the invite?"
            placeholder="Select a date"
            required
            error={fieldState.error?.message}
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
            label="I want this invite to be anonymous (not linked to your profile)."
            {...field}
            checked={field.value}
            size="md"
          />
        )}
      />

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
            placeholder="Enter graduate type"
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
          <NumberInput
            label="Year of Graduation"
            placeholder="Enter year of graduation"
            {...field}
            size="md"
          />
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

      <Button type="submit">Submit</Button>
    </form>
  );
};
