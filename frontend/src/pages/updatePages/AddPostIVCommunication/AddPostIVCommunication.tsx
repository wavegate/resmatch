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
import postIVCommunicationService from "@/services/postIVCommunicationService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  communicationReceived: z.string().optional(),
  thankYouLetterPolicy: z.string().optional(),
  rankImpact: z.string().optional(),
  source: z.string().optional(),
  linked: z.boolean(),
});

export default function AddPostIVCommunication() {
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
        ? postIVCommunicationService.updatePostIVCommunication(id, values)
        : postIVCommunicationService.createPostIVCommunication(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: postIVCommunicationData, isLoading } = useQuery({
    queryKey: ["postIVCommunication", id],
    queryFn: () => postIVCommunicationService.readPostIVCommunication(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (postIVCommunicationData) {
      form.reset(removeNulls(postIVCommunicationData));
    }
  }, [postIVCommunicationData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Post-IV Communication updated successfully!"
          : "Post-IV Communication added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["postIVCommunication"] });
      navigate("/post-iv-communication"); // Singular navigation path
    });
  }

  const items = [
    { title: "Post-IV Communications", to: "/post-iv-communication" },
    {
      title: isUpdate
        ? "Edit Post-IV Communication"
        : "Add Post-IV Communication",
    },
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
                label="Which program is this Post-IV Communication for?"
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
          name="communicationReceived"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Communication Received"
              placeholder="Enter the details of the communication received"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="thankYouLetterPolicy"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Thank You Letter Policy"
              placeholder="Describe the thank you letter policy"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="rankImpact"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Rank Impact"
              placeholder="Describe how the communication impacted your rank"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="source"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Source"
              placeholder="Enter the source of the communication"
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
              label="Link this Post-IV Communication to my profile."
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">
          {isUpdate
            ? "Update Post-IV Communication"
            : "Submit Post-IV Communication"}
        </Button>
      </form>
    </div>
  );
}
