import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Breadcrumbs, Anchor, Checkbox } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import rejectionService from "@/services/rejectionService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  date: z.date({ required_error: "A rejection date is required." }),
  linked: z.boolean(),
});

export default function AddRejection() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? rejectionService.updateRejection(id, values)
        : rejectionService.createRejection(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: rejectionData, isLoading } = useQuery({
    queryKey: ["rejection", id],
    queryFn: () => rejectionService.readRejection(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (rejectionData) {
      form.reset(removeNulls(rejectionData));
    }
  }, [rejectionData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Rejection updated successfully!"
          : "Rejection added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["rejection"] });
      navigate("/rejection");
    });
  }

  const items = [
    { title: "Interview Rejections", to: "/rejection" },
    { title: isUpdate ? "Edit Rejection" : "Add Rejection" },
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
                label="For which program did you receive the rejection?"
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
          name="date"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <DateInput
              label="On what day did you receive the rejection?"
              placeholder="Select a date"
              required
              error={fieldState.error?.message}
              size="md"
              value={value ? new Date(value) : null} // Ensure value is a Date object
              onChange={(date) => onChange(date)} // Pass Date object directly
            />
          )}
        />

        <Controller
          name="linked"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Link this rejection to my profile."
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">
          {isUpdate ? "Update Rejection" : "Submit Rejection"}
        </Button>
      </form>
    </div>
  );
}
