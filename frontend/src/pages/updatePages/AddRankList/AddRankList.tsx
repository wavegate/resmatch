import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Button,
  MultiSelect,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import rankListService from "@/services/rankListService";
import programService from "@/services/programService";
import { useEffect } from "react";

const formSchema = z.object({
  graduateType: z.string(),
  medicalDegree: z.string(),
  numberOfProgramsApplied: z.number().min(1),
  numberOfInvites: z.number().min(0),
  numberOfInterviewsAttended: z.number().min(0),
  programs: z.array(z.string()).min(1, "At least one program must be selected"),
  matchedProgramId: z.string().optional(),
  doneWithInterviews: z.boolean(),
  whyNumberOne: z.string().optional(),
  prioritizesWhenRanking: z.string().optional(),
  hardestPartOfRanking: z.string().optional(),
});

export default function AddRankList() {
  useAuthGuard();
  const { id } = useParams();
  const isUpdate = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      graduateType: "",
      medicalDegree: "",
      numberOfProgramsApplied: 0,
      numberOfInvites: 0,
      numberOfInterviewsAttended: 0,
      programs: [],
      matchedProgramId: undefined,
      doneWithInterviews: false,
      whyNumberOne: "",
      prioritizesWhenRanking: "",
      hardestPartOfRanking: "",
    },
  });

  const { control, handleSubmit, setValue } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch rank list data if updating
  const { data: rankListData, isLoading } = useQuery({
    queryKey: ["rankList", id],
    queryFn: () => rankListService.readRankList(id),
    enabled: isUpdate,
  });

  // Fetch list of programs for selection
  const { data: programsData } = useQuery({
    queryKey: ["programs"],
    queryFn: programService.getPrograms, // Assuming you have a function to fetch programs
  });

  useEffect(() => {
    if (rankListData) {
      form.reset(rankListData);
    }
  }, [rankListData]);

  const { mutateAsync } = useMutation({
    mutationFn: (values) => {
      if (isUpdate) {
        return rankListService.updateRankList(id, values);
      }
      return rankListService.createRankList(values);
    },
    onSuccess: () => {
      notifications.show({
        message: `Rank List ${isUpdate ? "updated" : "created"} successfully`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["rankList"] });
      navigate("/ranklist");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values);
  }

  const items = [
    { title: "Rank Lists", to: "/rank-list" },
    { title: isUpdate ? "Update Rank List" : "Add Rank List" },
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
    <div className="flex flex-col gap-4">
      <Breadcrumbs separator=">">{items}</Breadcrumbs>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {isLoading && <p>Loading...</p>}

        <Controller
          name="graduateType"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Graduate Type"
                placeholder="Enter the graduate type"
                required
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="medicalDegree"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="MedicalDegree"
                placeholder="Enter the graduate type"
                required
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="numberOfProgramsApplied"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Number of Programs Applied"
                placeholder="Enter the number of programs applied to"
                required
                type="number"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="numberOfInvites"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Number of Invites"
                placeholder="Enter the number of invites"
                required
                type="number"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="numberOfInterviewsAttended"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Number of Interviews Attended"
                placeholder="Enter the number of interviews attended"
                required
                type="number"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="programs"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <MultiSelect
                label="Programs"
                placeholder="Select programs"
                data={programsData?.map((program: any) => ({
                  value: program.id,
                  label: program.name,
                }))}
                required
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="matchedProgramId"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Matched Program ID"
                placeholder="Enter the matched program ID (optional)"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="doneWithInterviews"
          control={control}
          render={({ field }) => (
            <div>
              <TextInput
                label="Done with Interviews"
                placeholder="Are you done with interviews?"
                type="checkbox"
                checked={field.value}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="whyNumberOne"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Why #1"
                placeholder="Why is this your #1 choice?"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="prioritizesWhenRanking"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Prioritizes When Ranking"
                placeholder="What do you prioritize when ranking?"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="hardestPartOfRanking"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextInput
                label="Hardest Part of Ranking"
                placeholder="What was the hardest part of ranking?"
                error={fieldState.error?.message}
                size="md"
                {...field}
              />
            </div>
          )}
        />

        <Button type="submit" loading={isLoading}>
          {isUpdate ? "Update Rank List" : "Create Rank List"}
        </Button>
      </form>
    </div>
  );
}
