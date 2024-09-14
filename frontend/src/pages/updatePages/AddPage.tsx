import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import services from "@/services/services";
import { removeNulls } from "@/utils/processObjects";
import { Anchor, Breadcrumbs, Loader } from "@mantine/core";
import { schemas } from "../../schemas/schemas";
import FormGenerator from "./FormGenerator";
import useUser from "@/hooks/useUser";
import userService from "@/services/userService";
import { pageDescription } from "@/schemas/pageDescription";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";

const AddPage: React.FC<{ modelName: string }> = ({ modelName }) => {
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [resetValues, setResetValues] = useState({});

  const labels = pageDescription[modelName];
  const schema = schemas[modelName]; // Retrieve the schema based on modelName
  const service = services[modelName];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) =>
      isUpdate ? service.update(id, values) : service.create(values),
  });

  const { data: modelData, isLoading } = useQuery({
    queryKey: [modelName, id],
    queryFn: () => service.read(id),
    enabled: isUpdate,
  });
  useAuthGuard({ id: modelData?.user?.id });

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
          ? `${labels.singular} updated successfully!`
          : `${labels.singular} added successfully!`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: [modelName] });
      navigate(-1);
    });
  }

  const items = [
    { title: labels.name, to: `/${modelName}` },
    { title: isUpdate ? `Edit ${labels.singular}` : `Add ${labels.singular}` },
  ].map((item, index) =>
    item.to ? (
      <Link to={item.to} key={index}>
        <Anchor>{item.title}</Anchor>
      </Link>
    ) : (
      <span key={index}>{item.title}</span>
    )
  );

  const { user } = useUser();

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userService.readUser(user.id),
  });

  return (
    <>
      <Helmet>
        <title>
          {isUpdate ? `Edit ${labels.singular}` : `Add ${labels.singular}`} |{" "}
          {APP_NAME}
        </title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <Breadcrumbs separator=">">{items}</Breadcrumbs>
        {isLoading || userLoading ? (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        ) : (
          <FormGenerator
            isPending={isPending}
            userData={userData}
            modelName={modelName}
            onSubmit={onSubmit}
            resetValues={resetValues}
            isUpdate={isUpdate}
          />
        )}
      </div>
    </>
  );
};

export default AddPage;
