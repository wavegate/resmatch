import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import services from "@/services/services";
import { removeNulls } from "@/utils/processObjects";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { schemas } from "./schemas";
import FormGenerator from "./FormGenerator";

const AddPage: React.FC<{ modelName: string }> = ({ modelName }) => {
  useAuthGuard();
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [resetValues, setResetValues] = useState({});

  const schema = schemas[modelName]; // Retrieve the schema based on modelName
  const service = services[modelName];

  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      isUpdate ? service.update(id, values) : service.create(values),
  });

  const { data: modelData, isLoading } = useQuery({
    queryKey: [modelName, id],
    queryFn: () => service.read(id),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (modelData) {
      const transformedData = { ...modelData };
      Object.keys(schema).forEach((key) => {
        const fieldSchema = schema[key];
        if (fieldSchema.type === "date" && transformedData[key]) {
          transformedData[key] = new Date(transformedData[key]);
        } else if (
          fieldSchema.type === "multipleDates" &&
          Array.isArray(transformedData[key])
        ) {
          transformedData[key] = transformedData[key].map(
            (date: string) => new Date(date)
          );
        }
      });

      setResetValues(removeNulls(transformedData));
    }
  }, [modelData]);

  async function onSubmit(values: any) {
    await mutateAsync(values).then(() => {
      notifications.show({
        message: isUpdate
          ? `${modelName} updated successfully!`
          : `${modelName} added successfully!`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: [modelName] });
      navigate(`/${modelName}`);
    });
  }

  const items = [
    { title: modelName, to: `/${modelName}` },
    { title: isUpdate ? `Edit ${modelName}` : `Add ${modelName}` },
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
        schema={schema}
        onSubmit={onSubmit}
        resetValues={resetValues}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default AddPage;
