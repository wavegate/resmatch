import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Textarea, Button, Checkbox } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import commentService from "@/services/commentService";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  content: z.string().nonempty({ message: "Content is required" }),
  anonymous: z.boolean().optional(),
});

interface AddCommentFieldProps {
  modelName: string; // The name of the model, e.g., "postIVCommunication"
  id: number | string; // The ID of the model entity, e.g., "123"
  queryKey: string | string[]; // The query key to invalidate upon successful mutation
}

const AddCommentField: React.FC<AddCommentFieldProps> = ({
  modelName,
  id,
  queryKey,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      anonymous: false,
    },
  });

  const { control, handleSubmit, reset } = form;
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      commentService.createComment({ ...values, [`${modelName}Id`]: id }),
    onSuccess: () => {
      notifications.show({
        message: "Comment created successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey });
      reset(); // Clear the form after successful submission
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to create the comment",
        color: "red",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4`}>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            label="New Comment"
            placeholder="Enter your comment"
            required
            error={fieldState.error?.message}
            minRows={4}
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

      <Button type="submit" className={`w-fit`} loading={isPending}>
        Submit Comment
      </Button>
    </form>
  );
};

export default AddCommentField;
