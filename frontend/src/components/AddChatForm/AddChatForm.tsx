import { useForm, Controller } from "react-hook-form";
import { Textarea, Checkbox, Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "@/services/commentService"; // Assuming you have a commentService
import { notifications } from "@mantine/notifications";

export default function AddChatForm({
  parentId,
  setRepliesOpened,
  setReplyOpened,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      linked: false,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      commentService.createComment({ ...values, parentId }),
  });

  const onSubmit = (values) => {
    mutateAsync(values).then((res) => {
      queryClient.resetQueries({ queryKey: ["comment", parentId] });
      setRepliesOpened(true);
      setReplyOpened(false);
      reset();
      notifications.show({
        title: "Success",
        message: "Comment posted successfully",
        color: "green",
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mt-2"
    >
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Write your reply..."
            required
            minRows={3}
          />
        )}
      />
      <Controller
        name="linked"
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            label="Link to my profile"
            size="md"
            checked={field.value}
          />
        )}
      />
      <Button type="submit" size="sm" className={`w-fit`} loading={isPending}>
        Submit Reply
      </Button>
    </form>
  );
}