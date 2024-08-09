import { Drawer, TextInput, Textarea, Button, Group } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import threadService from "@/services/threadService";
import { notifications } from "@mantine/notifications";

// Define validation schema with Zod
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

const CreateThreadDrawer = ({ opened, onClose }) => {
  const queryClient = useQueryClient();

  // useForm with Zod validation
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // useMutation for creating a new thread
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof schema>) => {
      return threadService.createThread(values);
    },
    onSuccess: () => {
      notifications.show({
        message: "Thread created successfully",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["threads"] }); // Invalidate threads cache to refetch the updated list
      onClose(); // Close the drawer after successful submission
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await mutateAsync(data);
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Create New Thread"
      padding="xl"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Title"
          placeholder="Thread Title"
          {...register("title")}
          error={errors.title?.message}
          required
        />
        <Textarea
          label="Content"
          placeholder="Thread Content"
          {...register("content")}
          error={errors.content?.message}
          required
          mt="md"
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isPending}>
            Create Thread
          </Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default CreateThreadDrawer;
