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
import impressionService from "@/services/impressionService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  positives: z.string().optional(),
  negatives: z.string().optional(),
  howInterviewDayAffectsRank: z.string().optional(),
  gift: z.string().optional(),
  timeGiftReceived: z.string().optional(),
  linked: z.boolean(),
});

export default function AddImpression() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linked: false,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? impressionService.updateImpression(id, values)
        : impressionService.createImpression(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: impressionData, isLoading } = useQuery({
    queryKey: ["impression", id],
    queryFn: () => impressionService.readImpression(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (impressionData) {
      form.reset(removeNulls(impressionData));
    }
  }, [impressionData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Impression updated successfully!"
          : "Impression added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["impression"] });
      navigate("/impression");
    });
  }

  const items = [
    { title: "Impressions", to: "/impression" },
    { title: isUpdate ? "Edit Impression" : "Add Impression" },
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
                label="Which program is this impression for?"
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
          name="positives"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Positives"
              placeholder="Enter positives"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="negatives"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Negatives"
              placeholder="Enter negatives"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="howInterviewDayAffectsRank"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="How Interview Day Affects Rank"
              placeholder="Describe how the interview day affects your rank"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="gift"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Gift"
              placeholder="Describe the gift received (if any)"
              error={fieldState.error?.message}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="timeGiftReceived"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Time Gift Received"
              placeholder="Enter the time the gift was received (if any)"
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
              label="Link this impression to my profile."
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">
          {isUpdate ? "Update Impression" : "Submit Impression"}
        </Button>
      </form>
    </div>
  );
}
