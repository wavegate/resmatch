import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Textarea,
  Button,
  Checkbox,
  NumberInput,
  Select,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { removeNulls } from "@/utils/processObjects";
import rankListService from "@/services/rankListService";
import ProgramList from "@/components/ProgramList/ProgramList";

const formSchema = z.object({
  graduateType: z.string().nonempty({ message: "Graduate Type is required" }),
  medicalDegree: z.string().optional(),
  numberOfProgramsApplied: z.number().optional(),
  numberOfInvites: z.number().optional(),
  numberOfInterviewsAttended: z.number().optional(),
  doneWithInterviews: z.boolean().optional(),
  whyNumberOne: z.string().optional(),
  prioritiesWhenRanking: z.string().optional(),
  hardestPartOfRanking: z.string().optional(),
  linked: z.boolean().default(false),
  programs: z
    .array(z.number())
    .nonempty("At least one program must be selected"),
});

export default function AddRankList({ type }: { type: "MD" | "DO" | "IMG" }) {
  useAuthGuard();
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linked: false,
      medicalDegree: type === "MD" ? "MD" : type === "DO" ? "DO" : undefined,
      graduateType: type === "IMG" ? "IMG" : "US",
    },
  });
  console.log(form.formState.errors);

  const [initialPrograms, setInitialPrograms] = useState([]);

  const { control, handleSubmit, reset } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: rankListData, isLoading } = useQuery({
    queryKey: ["rankList", id],
    queryFn: () => rankListService.readRankList(id!),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (rankListData) {
      reset(
        removeNulls({
          graduateType: rankListData.graduateType,
          medicalDegree: rankListData.medicalDegree,
          numberOfProgramsApplied: rankListData.numberOfProgramsApplied,
          numberOfInvites: rankListData.numberOfInvites,
          numberOfInterviewsAttended: rankListData.numberOfInterviewsAttended,
          doneWithInterviews: rankListData.doneWithInterviews,
          whyNumberOne: rankListData.whyNumberOne,
          prioritiesWhenRanking: rankListData.prioritiesWhenRanking,
          hardestPartOfRanking: rankListData.hardestPartOfRanking,
          linked: rankListData.linked,
          programs: rankListData.programs?.map((program) => program.id),
        })
      );
      setInitialPrograms(rankListData.programs || []);
    }
  }, [rankListData, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      isUpdate
        ? rankListService.updateRankList(id!, values)
        : rankListService.createRankList(values),
    onSuccess: () => {
      notifications.show({
        message: `Rank List ${isUpdate ? "updated" : "created"} successfully!`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["rankList"] });
      navigate(`/rank-list-${type.toLowerCase()}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  const items = [
    {
      title:
        type === "MD"
          ? "Rank Lists (MD)"
          : type === "DO"
          ? "Rank Lists (DO)"
          : "Rank Lists (IMG)",
      to:
        type === "MD"
          ? "/rank-list-md"
          : type === "DO"
          ? "/rank-list-do"
          : "/rank-list-img",
    },
    { title: isUpdate ? "Edit Rank List" : "Add Rank List" },
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
          name="programs"
          control={control}
          render={({ field }) => (
            <ProgramList
              initialPrograms={initialPrograms}
              selectedPrograms={field.value}
              onProgramsChange={field.onChange}
            />
          )}
        />

        <Controller
          name="numberOfProgramsApplied"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Number of Programs Applied"
              placeholder="Enter the number"
              {...field}
            />
          )}
        />

        <Controller
          name="numberOfInvites"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Number of Invites"
              placeholder="Enter the number"
              {...field}
            />
          )}
        />

        <Controller
          name="numberOfInterviewsAttended"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Number of Interviews Attended"
              placeholder="Enter the number"
              {...field}
            />
          )}
        />

        <Controller
          name="doneWithInterviews"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Done with Interviews"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="whyNumberOne"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Why Number One?"
              placeholder="Why did you rank this program number one?"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="prioritiesWhenRanking"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Priorities When Ranking"
              placeholder="What were your priorities when ranking?"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="hardestPartOfRanking"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Hardest Part of Ranking"
              placeholder="What was the hardest part of ranking?"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="linked"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Link this Rank List to my profile."
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Button type="submit" loading={isPending}>
          {isUpdate ? "Update Rank List" : "Submit Rank List"}
        </Button>
      </form>
    </div>
  );
}
