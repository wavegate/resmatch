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
  linked: z.boolean().optional(),
});

export default function AddChat() {
  useAuthGuard();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (values) => commentService.createComment(values),
    onSuccess: () => {
      notifications.show({
        message: "Chat thread created successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate("/main-chat");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync({ ...values, main: true });
  };

  const items = [
    { title: "Main Chat", to: "/main-chat" },
    { title: "New Thread" },
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
              label="Thread Content"
              placeholder="Enter the content"
              required
              error={fieldState.error?.message}
              minRows={4}
              {...field}
            />
          )}
        />

        <Controller
          name="linked"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Link to my profile"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit">Create Chat</Button>
      </form>
    </div>
  );
}
