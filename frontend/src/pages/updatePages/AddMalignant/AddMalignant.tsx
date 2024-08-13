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
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import malignantService from "@/services/malignantService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  malignant: z.enum(["Yes", "No", "Maybe"]),
  source: z.string().optional(),
  explanation: z.string().optional(),
  anonymous: z.boolean().default(false),
});

export default function AddMalignant() {
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
        ? malignantService.updateMalignant(id, values)
        : malignantService.createMalignant(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: malignantData, isLoading } = useQuery({
    queryKey: ["malignant", id],
    queryFn: () => malignantService.readMalignant(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (malignantData) {
      const transformedData = removeNulls(malignantData);
      form.reset({
        ...transformedData,
        linked: transformedData.linked ?? false,
      });
    }
  }, [malignantData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Malignant program updated successfully!"
          : "Malignant program added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["malignant"] });
      navigate("/malignant");
    });
  }

  const items = [
    { title: "Malignant Programs", to: "/malignant" },
    { title: isUpdate ? "Edit Malignant Program" : "Add Malignant Program" },
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
              label="For which program is this entry?"
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="malignant"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              label="Malignant"
              placeholder="Select Malignant Level"
              data={["Yes", "No", "Maybe"]}
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="source"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Source"
              placeholder="Where did this information come from?"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="explanation"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Explanation"
              placeholder="Provide any additional details"
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

        <Button type="submit" loading={isPending}>
          {isUpdate ? "Update Malignant Program" : "Submit Malignant Program"}
        </Button>
      </form>
    </div>
  );
}
