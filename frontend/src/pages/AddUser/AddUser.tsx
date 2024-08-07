import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Checkbox,
  Button,
  Select,
  NumberInput,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import userService from "@/services/userService";
import {
  ClassRanking,
  GraduateType,
  IMGType,
  MedicalDegree,
  Pathway,
  SchoolRanking,
} from "@/typings/UserTypings";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
  greenCard: z.boolean().optional(),
  step2CSPathway: z.nativeEnum(Pathway).optional(),
  schoolRanking: z.nativeEnum(SchoolRanking).optional(),
  yearOfGraduation: z
    .number()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  monthsOfUSCE: z.number().min(0).optional(),
  ecfmgCertified: z.boolean().optional(),
  visaRequired: z.boolean().optional(),
  graduateType: z.nativeEnum(GraduateType).optional(),
  medicalDegree: z.nativeEnum(MedicalDegree).optional(),
  img: z.nativeEnum(IMGType).optional(),
  step1ScorePass: z.boolean().optional(),
  step1Score: z.number().min(0).max(300).optional(),
  step2Score: z.number().min(0).max(300).optional(),
  step3Score: z.number().min(0).max(300).optional(),
  comlex1ScorePass: z.boolean().optional(),
  comlex2Score: z.number().min(0).max(999).optional(),
  redFlags: z.boolean().optional(),
  redFlagsExplanation: z.string().optional(),
  aoa: z.boolean().optional(),
  sigmaSigmaPhi: z.boolean().optional(),
  goldHumanism: z.boolean().optional(),
  numPublications: z.number().min(0).optional(),
  numWorkExperiences: z.number().min(0).optional(),
  numVolunteerExperiences: z.number().min(0).optional(),
  classRank: z.nativeEnum(ClassRanking).optional(),
  otherDegrees: z.string().optional(),
  numApplications: z.number().min(0).optional(),
  numInterviews: z.number().min(0).optional(),
  numWithdrawn: z.number().min(0).optional(),
  numRejected: z.number().min(0).optional(),
  numWaitlisted: z.number().min(0).optional(),
  applicationYear: z
    .number()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
});

export default function AddUser() {
  useAuthGuard();
  const { id } = useParams();
  const isUpdate = !!id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      isUpdate
        ? userService.updateUser(id, values)
        : userService.createUser(values),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.readUser(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values).then((res) => {
      notifications.show({
        message: isUpdate
          ? "User updated successfully!"
          : "User added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    });
  }

  const items = [
    { title: "Applicants", to: "/user" },
    { title: "Add Applicant" },
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
          name="graduateType"
          control={control}
          render={({ field }) => (
            <Select
              label="Graduate Type"
              placeholder="Select Graduate Type"
              data={Object.values(GraduateType)}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="medicalDegree"
          control={control}
          render={({ field }) => (
            <Select
              label="Medical Degree"
              placeholder="Select Medical Degree"
              data={Object.values(MedicalDegree)}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="img"
          control={control}
          render={({ field }) => (
            <Select
              label="IMG Type"
              placeholder="Select IMG Type"
              data={Object.values(IMGType)}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="step1ScorePass"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Step 1 Score Pass"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="step1Score"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Step 1 Score"
              placeholder="Enter Step 1 Score"
              min={0}
              max={300}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="step2Score"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Step 2 Score"
              placeholder="Enter Step 2 Score"
              min={0}
              max={300}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="comlex1ScorePass"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="COMLEX 1 Score Pass"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="comlex2Score"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="COMLEX 2 Score"
              placeholder="Enter COMLEX 2 Score"
              min={0}
              max={999}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="schoolRanking"
          control={control}
          render={({ field }) => (
            <Select
              label="School Ranking"
              placeholder="Select School Ranking"
              data={Object.values(SchoolRanking)}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="classRank"
          control={control}
          render={({ field }) => (
            <Select
              label="Class Rank"
              placeholder="Select Class Rank"
              data={Object.values(ClassRanking)}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="greenCard"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Green Card"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="visaRequired"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Visa Required"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="ecfmgCertified"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="ECFMG Certified"
              {...field}
              checked={field.value}
              size="md"
            />
          )}
        />

        <Controller
          name="yearOfGraduation"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Year of Graduation"
              placeholder="Enter Year of Graduation"
              min={1900}
              max={new Date().getFullYear()}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="monthsOfUSCE"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Months of US Clinical Experience"
              placeholder="Enter Months"
              min={0}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="numPublications"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Number of Publications"
              placeholder="Enter Number"
              min={0}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="numWorkExperiences"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Number of Work Experiences"
              placeholder="Enter Number"
              min={0}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="numVolunteerExperiences"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Number of Volunteer Experiences"
              placeholder="Enter Number"
              min={0}
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="otherDegrees"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Other Degrees"
              placeholder="Enter Other Degrees"
              size="md"
              {...field}
            />
          )}
        />

        <Controller
          name="applicationYear"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Application Year"
              placeholder="Enter Application Year"
              min={1900}
              max={new Date().getFullYear()}
              size="md"
              {...field}
            />
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
