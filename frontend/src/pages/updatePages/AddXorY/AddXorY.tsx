import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Textarea,
  Button,
  Checkbox,
  Breadcrumbs,
  Anchor,
  Switch,
  Loader,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import { notifications } from "@mantine/notifications";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import xOrYService from "@/services/xOrYService";

const formSchema = z.object({
  programXId: z.number({ required_error: "Program X is required." }),
  programYId: z.number({ required_error: "Program Y is required." }),
  question: z.string().nonempty({ message: "Question is required" }),
  img: z.boolean().optional(),
  anonymous: z.boolean().optional(),
});

export default function AddXorY({ img = false }: { img?: boolean }) {
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img,
    },
  });

  const { control, handleSubmit, reset } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: xorYData, isLoading } = useQuery({
    queryKey: ["xorY", id],
    queryFn: () => xOrYService.readXorY(id!),
    enabled: isUpdate,
  });
  useAuthGuard({ id: xorYData?.userId });
  useEffect(() => {
    if (xorYData) {
      reset(
        removeNulls({
          programXId: xorYData.programXId,
          programYId: xorYData.programYId,
          question: xorYData.question,
          img: xorYData.img,
          anonymous: xorYData.anonymous,
        })
      );
    }
  }, [xorYData, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      isUpdate
        ? xOrYService.updateXorY(id!, { ...values, img })
        : xOrYService.createXorY({ ...values, img }),
    onSuccess: () => {
      notifications.show({
        message: `XorY ${isUpdate ? "updated" : "created"} successfully!`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["xorY"] });
      navigate(img ? "/x-or-y-img" : "/x-or-y");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  const items = [
    { title: "XorY List", to: img ? "/x-or-y-img" : "/x-or-y" },
    { title: isUpdate ? "Edit XorY" : "Add XorY" },
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
      {isLoading ? (
        <Loader className={`mt-12 flex w-full justify-center`} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex flex-col gap-4`}
        >
          <Controller
            name="programXId"
            control={control}
            render={({ field, fieldState }) => (
              <ProgramSearch
                required
                selected={field.value}
                onChange={field.onChange}
                label="Select Program X"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="programYId"
            control={control}
            render={({ field, fieldState }) => (
              <ProgramSearch
                required
                selected={field.value}
                onChange={field.onChange}
                label="Select Program Y"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="question"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                label="Question"
                placeholder="Enter your question"
                required
                error={fieldState.error?.message}
                minRows={3}
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
            {isUpdate ? "Update XorY" : "Submit XorY"}
          </Button>
        </form>
      )}
    </div>
  );
}
