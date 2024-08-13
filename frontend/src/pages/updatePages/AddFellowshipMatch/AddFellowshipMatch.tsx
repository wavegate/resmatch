import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Textarea,
  Button,
  Checkbox,
  Breadcrumbs,
  Anchor,
  NumberInput,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import useAuthGuard from "@/hooks/useAuthGuard";
import fellowshipMatchService from "@/services/fellowshipMatchService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import { notifications } from "@mantine/notifications";

const formSchema = z.object({
  year: z
    .number()
    .min(1900, "Year cannot be before 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  programId: z.number({ required_error: "Program is required." }),
  matchData: z.string().min(1, { message: "Match data is required." }),
  anonymous: z.boolean(),
});

export default function AddFellowshipMatch() {
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
        ? fellowshipMatchService.updateFellowshipMatch(id, values)
        : fellowshipMatchService.createFellowshipMatch(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: fellowshipMatchData, isLoading } = useQuery({
    queryKey: ["fellowshipMatch", id],
    queryFn: () => fellowshipMatchService.readFellowshipMatch(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (fellowshipMatchData) {
      form.reset(removeNulls(fellowshipMatchData));
    }
  }, [fellowshipMatchData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Fellowship match updated successfully!"
          : "Fellowship match added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["fellowshipMatch"] });
      navigate("/fellowship-match");
    });
  }

  const items = [
    { title: "Fellowship Match", to: "/fellowship-match" },
    { title: isUpdate ? "Edit Fellowship Match" : "Add Fellowship Match" },
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
          name="year"
          control={control}
          render={({ field, fieldState }) => (
            <NumberInput
              label="Year"
              placeholder="Enter the year of the match"
              required
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="programId"
          control={control}
          render={({ field, fieldState }) => (
            <ProgramSearch
              required
              selected={field.value}
              onChange={field.onChange}
              label="For which program is this fellowship match?"
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="matchData"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Match Data"
              placeholder="Enter match data"
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
              label="Post anonymously"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit" loading={isPending}>
          {isUpdate ? "Update Fellowship Match" : "Submit Fellowship Match"}
        </Button>
      </form>
    </div>
  );
}
