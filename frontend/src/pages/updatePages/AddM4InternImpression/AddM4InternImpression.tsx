import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Breadcrumbs, Anchor, Textarea, Checkbox } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import m4InternImpressionService from "@/services/m4InternImpressionService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  positiveImpression: z.string().optional(),
  negativeImpression: z.string().optional(),
  linked: z.boolean().default(false),
});

export default function AddM4InternImpression() {
  useAuthGuard();
  const { id } = useParams();
  const isUpdate = !!id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linked: false,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? m4InternImpressionService.updateM4InternImpression(id, values)
        : m4InternImpressionService.createM4InternImpression(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: impressionData, isLoading } = useQuery({
    queryKey: ["m4InternImpression", id],
    queryFn: () => m4InternImpressionService.readM4InternImpression(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (impressionData) {
      const transformedData = removeNulls(impressionData);
      form.reset({
        ...transformedData,
        linked: transformedData.linked ?? false,
      });
    }
  }, [impressionData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "M4 Intern Impression updated successfully!"
          : "M4 Intern Impression added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["m4InternImpression"] });
      navigate("/m4-intern-impression");
    });
  }

  const items = [
    { title: "M4 Intern Impressions", to: "/m4-intern-impression" },
    {
      title: isUpdate
        ? "Edit M4 Intern Impression"
        : "Add M4 Intern Impression",
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
          render={({ field, fieldState }) => (
            <ProgramSearch
              required
              selected={field.value}
              onChange={field.onChange}
              label="For which program is this impression?"
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="positiveImpression"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Positive Impression"
              placeholder="Share any positive experiences"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="negativeImpression"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Negative Impression"
              placeholder="Share any negative experiences"
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
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              size="md"
            />
          )}
        />

        <Button type="submit" loading={isPending}>
          {isUpdate ? "Update Impression" : "Submit Impression"}
        </Button>
      </form>
    </div>
  );
}
