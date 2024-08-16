import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea, Button, Checkbox, Breadcrumbs, Anchor } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import { notifications } from "@mantine/notifications";
import commentService from "@/services/commentService";

const formSchema = z.object({
  content: z.string().nonempty({ message: "Content is required" }),
  anonymous: z.boolean().optional(),
});

interface AddCommentProps {
  type: "main" | "pstp" | "report";
  parameterName: string; // The parameter name to associate the comment with
  parameterValue: number | string; // The value for the parameter (e.g., questionId)
}

export default function AddComment({
  type,
  parameterName,
  parameterValue,
}: AddCommentProps) {
  useAuthGuard();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous: true,
    },
  });

  const { control, handleSubmit } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      commentService.createComment({
        ...values,
        [parameterName]: parameterValue,
      }),
    onSuccess: () => {
      notifications.show({
        message: `${
          type === "main"
            ? "Chat thread"
            : type === "pstp"
            ? "PSTP thread"
            : "Report"
        } created successfully!`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: [type] });
      navigate(
        `/${type === "main" ? "main" : type === "pstp" ? "pstp" : "report"}`
      );
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  const items = [
    {
      title:
        type === "main"
          ? "Main Chat"
          : type === "pstp"
          ? "PSTP Chat"
          : "Reports",
      to: `/${type === "main" ? "main" : type === "pstp" ? "pstp" : "report"}`,
    },
    {
      title:
        type === "main"
          ? "New Thread"
          : type === "pstp"
          ? "New PSTP Thread"
          : "New Report",
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
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label={`${
                type === "main"
                  ? "Thread Content"
                  : type === "pstp"
                  ? "PSTP Content"
                  : "Report Content"
              }`}
              placeholder={`Enter the ${
                type === "main" ? "thread" : type === "pstp" ? "PSTP" : "report"
              } content`}
              required
              error={fieldState.error?.message}
              minRows={4}
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

        <Button type="submit">
          {`Create ${
            type === "main"
              ? "Chat"
              : type === "pstp"
              ? "PSTP Thread"
              : "Report"
          }`}
        </Button>
      </form>
    </div>
  );
}
