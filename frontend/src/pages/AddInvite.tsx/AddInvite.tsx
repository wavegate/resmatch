import { z } from "zod";
import { numericNull } from "@/utils/zodHelpers";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Checkbox, Textarea, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const formSchema = z.object({
  anonymous: z.boolean().optional(),
  programId: z.string({ message: "Program is required." }).min(1),
  inviteDateTime: z.date({ required_error: "An invitation date is required." }),
  signal: z.boolean().optional(),
  geographicPreference: z.boolean().optional(),
  locationState: z.string().optional(),
  additionalComments: z.string().optional(),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="programId"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            label="Program ID"
            placeholder="Enter Program ID"
            required
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="inviteDateTime"
        control={control}
        render={({ field, fieldState }) => (
          <DatePicker
            label="Invitation Date"
            placeholder="Select a date"
            required
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="anonymous"
        control={control}
        render={({ field }) => (
          <Checkbox label="Anonymous" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="signal"
        control={control}
        render={({ field }) => (
          <Checkbox label="Signal Sent" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="geographicPreference"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="Geographic Preference"
            {...field}
            checked={field.value}
          />
        )}
      />

      <Controller
        name="locationState"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Location State"
            placeholder="Enter state"
            {...field}
          />
        )}
      />

      <Controller
        name="additionalComments"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Additional Comments"
            placeholder="Enter any additional comments"
            {...field}
          />
        )}
      />

      <Controller
        name="step1ScorePass"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="Step 1 Score Pass"
            {...field}
            checked={field.value}
          />
        )}
      />

      <Controller
        name="step1Score"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Step 1 Score"
            placeholder="Enter Step 1 Score"
            {...field}
          />
        )}
      />

      <Controller
        name="step2Score"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Step 2 Score"
            placeholder="Enter Step 2 Score"
            {...field}
          />
        )}
      />

      <Controller
        name="comlex1ScorePass"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="COMLEX 1 Score Pass"
            {...field}
            checked={field.value}
          />
        )}
      />

      <Controller
        name="comlex2Score"
        control={control}
        render={({ field }) => (
          <TextInput
            label="COMLEX 2 Score"
            placeholder="Enter COMLEX 2 Score"
            {...field}
          />
        )}
      />

      <Controller
        name="visaRequired"
        control={control}
        render={({ field }) => (
          <Checkbox label="Visa Required" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="subI"
        control={control}
        render={({ field }) => (
          <Checkbox label="SubI" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="home"
        control={control}
        render={({ field }) => (
          <Checkbox label="Home" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="yearOfGraduation"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Year of Graduation"
            placeholder="Enter year of graduation"
            {...field}
          />
        )}
      />

      <Controller
        name="greenCard"
        control={control}
        render={({ field }) => (
          <Checkbox label="Green Card" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="away"
        control={control}
        render={({ field }) => (
          <Checkbox label="Away Rotation" {...field} checked={field.value} />
        )}
      />

      <Controller
        name="graduateType"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Graduate Type"
            placeholder="Enter graduate type"
            {...field}
          />
        )}
      />

      <Controller
        name="img"
        control={control}
        render={({ field }) => (
          <TextInput label="IMG" placeholder="Enter IMG" {...field} />
        )}
      />

      <Controller
        name="medicalDegree"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Medical Degree"
            placeholder="Enter medical degree"
            {...field}
          />
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
