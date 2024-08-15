import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import services from "@/services/services";
import { removeNulls } from "@/utils/processObjects";
import { FormSchema } from "../../../schemas/schema";
import FormGenerator from "../FormGenerator";
import { Anchor, Breadcrumbs } from "@mantine/core";

const logisticsFormSchema: FormSchema = {
  programId: {
    type: "programSearch",
    label: "Program",
    description: "Select the program for which this logistics applies.",
    required: true,
  },
  schedulerPlatform: {
    type: "string",
    label: "Scheduler Platform",
    description: "Enter the platform used for scheduling.",
  },
  ivFormat: {
    type: "string",
    label: "Interview Format",
    description: "Enter the format of the interview.",
  },
  timeSlots: {
    type: "string",
    label: "Time Slots",
    description: "Specify the available time slots.",
  },
  ivPlatform: {
    type: "string",
    label: "Interview Platform",
    description: "Enter the platform used for the interview.",
  },
  openIVDates: {
    type: "multipleDates",
    label: "Open Interview Dates",
    description: "Pick the dates when interviews are available.",
    defaultValue: [],
  },
  anonymous: {
    type: "boolean",
    label: "Post Anonymously",
    description: "Should this post be anonymous?",
    defaultValue: false,
  },
};

export default function AddLogistics() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [resetValues, setResetValues] = useState({});

  const service = services["interviewLogistics"];

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate ? service.update(id, values) : service.create(values),
  });

  const { data: modelData, isLoading } = useQuery({
    queryKey: ["interviewLogistics", id],
    queryFn: () => service.read(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (modelData) {
      // const transformedData = transformData(modelData, logisticsFormSchema);
      const transformedData = modelData;
      setResetValues(removeNulls(transformedData));
    }
  }, [modelData]);

  async function onSubmit(values: any) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? "Interview Logistics updated successfully!"
          : "Interview Logistics added successfully!",
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["interviewLogistics"] });
      navigate("/interviewLogistics");
    });
  }

  const items = [
    { title: "Interview Logistics", to: "/logistics" },
    { title: isUpdate ? "Edit Logistics" : "Add Logistics" },
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
      <FormGenerator
        schema={logisticsFormSchema}
        onSubmit={onSubmit}
        defaultValues={{ anonymous: false }}
        resetValues={resetValues}
        isUpdate={isUpdate}
      />
    </div>
  );
}
