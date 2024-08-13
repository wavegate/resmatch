import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Breadcrumbs, Anchor, Checkbox, Textarea } from "@mantine/core";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import questionService from "@/services/questionService";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";

const formSchema = z.object({
  programId: z.number({ required_error: "Program is required." }),
  questions: z.string().optional(),
  anonymous: z.boolean(),
});

export default function AddQuestion() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>(); // Use the ID from the URL params
  const isUpdate = !!id; // Check if this is an update operation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      anonymous: true,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? questionService.updateQuestion(id, {
            ...values,
            questions: values.questions?.split(";").map((q) => q.trim()) || [],
          })
        : questionService.createQuestion({
            ...values,
            questions: values.questions?.split(";").map((q) => q.trim()) || [],
          }),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: questionData, isLoading } = useQuery({
    queryKey: ["question", id],
    queryFn: () => questionService.readQuestion(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (questionData) {
      const transformedData = {
        ...questionData,
        questions: questionData.questions.join("; "),
      };

      form.reset(removeNulls(transformedData));
    }
  }, [questionData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Question updated successfully!"
          : "Question added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["question"] });
      navigate("/question");
    });
  }

  const items = [
    { title: "Questions", to: "/question" },
    { title: isUpdate ? "Edit Question" : "Add Question" },
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
                label="Which program are these questions for?"
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
          name="questions"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Questions"
              placeholder="Enter questions separated by semicolons"
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

        <Button type="submit">
          {isUpdate ? "Update Question" : "Submit Question"}
        </Button>
      </form>
    </div>
  );
}
