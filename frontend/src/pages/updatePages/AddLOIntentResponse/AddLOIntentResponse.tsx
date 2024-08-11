import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Breadcrumbs,
  Anchor,
  Checkbox,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import loiResponseService from "@/services/loiResponseService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  sentTo: z.string().optional(),
  dateSent: z.date().optional(),
  response: z.boolean().optional(),
  responseTone: z.string().optional(),
  timeBetweenSentAndResponse: z.string().optional(),
  mentionedTopChoice: z.boolean().optional(),
  linked: z.boolean(),
  intent: z.boolean(),
});

export default function AddLOIntentResponse() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linked: false,
      intent: true, // Default intent to false
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? loiResponseService.updateLOIResponse(id, values)
        : loiResponseService.createLOIResponse(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: loiResponseData, isLoading } = useQuery({
    queryKey: ["lointentResponse", id],
    queryFn: () => loiResponseService.readLOIResponse(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (loiResponseData) {
      form.reset(removeNulls(loiResponseData));
    }
  }, [loiResponseData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "LOI Response updated successfully!"
          : "LOI Response added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["lointentResponse"] });
      navigate("/lointent-response"); // Singular navigation path
    });
  }

  const items = [
    { title: "LOI Responses", to: "/loiresponse" },
    { title: isUpdate ? "Edit LOI Response" : "Add LOI Response" },
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
                label="Which program is this LOI response for?"
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
          name="sentTo"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Sent To"
              placeholder="Enter the recipient"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="dateSent"
          control={control}
          render={({ field, fieldState }) => (
            <DateInput
              label="Date Sent"
              placeholder="Select the date sent"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="response"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Received a response?"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="responseTone"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Response Tone"
              placeholder="Describe the tone of the response"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="timeBetweenSentAndResponse"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Time Between Sent and Response"
              placeholder="Enter the time between sending and response"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="mentionedTopChoice"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Mentioned Top Choice?"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="linked"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Link this LOI response to my profile."
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">
          {isUpdate ? "Update LOI Response" : "Submit LOI Response"}
        </Button>
      </form>
    </div>
  );
}
