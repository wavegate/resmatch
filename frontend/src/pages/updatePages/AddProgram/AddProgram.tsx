import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Breadcrumbs, Anchor } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import programService from "@/services/programService";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string(),
  image: z.string().url().optional().nullable(),
});

export default function ProgramForm() {
  useAuthGuard();
  const { id } = useParams();
  const isUpdate = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const { control, handleSubmit, setValue } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch program data if updating
  const { data: programData, isLoading } = useQuery({
    queryKey: ["program", id],
    queryFn: () => programService.readProgram(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (programData) {
      form.reset(programData);
    }
  }, [programData]);

  const { mutateAsync } = useMutation({
    mutationFn: (values) => {
      if (isUpdate) {
        return programService.updateProgram(id, values);
      }
      return programService.createProgram(values);
    },
    onSuccess: () => {
      notifications.show({
        message: `Program ${isUpdate ? "updated" : "created"} successfully`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["program"] });
      navigate("/program");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
  }

  const items = [
    { title: "Programs", to: "/program" },
    { title: isUpdate ? "Update Program" : "Add Program" },
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
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Program Name"
                placeholder="Enter the program name"
                required
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Image URL"
                placeholder="Enter the image URL"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Button type="submit" loading={isLoading}>
          {isUpdate ? "Update Program" : "Create Program"}
        </Button>
      </form>
    </div>
  );
}
