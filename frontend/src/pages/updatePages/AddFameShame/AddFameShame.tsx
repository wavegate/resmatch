import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Textarea,
  Button,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import fameShameService from "@/services/fameShameService";
import { useEffect } from "react";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";

const formSchema = z.object({
  fame: z.string().min(1, "Fame is required"),
  shame: z.string().min(1, "Shame is required"),
  programId: z.number().min(1, "Program selection is required"),
});

export default function AddFameShamePage() {
  useAuthGuard();
  const { id } = useParams();
  const isUpdate = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fame: "",
      shame: "",
      programId: undefined,
    },
  });

  const { control, handleSubmit, setValue } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch fame/shame data if updating
  const { data: fameShameData, isLoading } = useQuery({
    queryKey: ["fameShame", id],
    queryFn: () => fameShameService.readFameShame(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (fameShameData) {
      form.reset(fameShameData);
    }
  }, [fameShameData]);

  const { mutateAsync } = useMutation({
    mutationFn: (values) => {
      if (isUpdate) {
        return fameShameService.updateFameShame(id, values);
      }
      return fameShameService.createFameShame(values);
    },
    onSuccess: () => {
      notifications.show({
        message: `Fame/Shame entry ${
          isUpdate ? "updated" : "created"
        } successfully`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["fameShame"] });
      navigate("/fame-shame");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
  }

  const items = [
    { title: "Fame & Shame", to: "/fame-shame" },
    { title: isUpdate ? "Update Fame/Shame" : "Add Fame/Shame" },
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
    <div className="flex flex-col gap-4">
      <Breadcrumbs separator=">">{items}</Breadcrumbs>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isLoading && <p>Loading...</p>}

        <Controller
          name="fame"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Textarea
                label="Fame"
                placeholder="Enter the fame details"
                required
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="shame"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Textarea
                label="Shame"
                placeholder="Enter the shame details"
                required
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="programId"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <div>
              <ProgramSearch
                required
                selected={value}
                onChange={onChange}
                label="Select the program"
              />
              {fieldState.error && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {fieldState.error.message}
                </div>
              )}
            </div>
          )}
        />

        <Button type="submit" size="md">
          {isUpdate ? "Update Fame/Shame" : "Add Fame/Shame"}
        </Button>
      </form>
    </div>
  );
}
