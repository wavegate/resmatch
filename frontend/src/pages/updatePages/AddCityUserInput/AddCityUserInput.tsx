import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea, Button, Checkbox, Breadcrumbs, Anchor } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { removeNulls } from "@/utils/processObjects";
import cityUserInputService from "@/services/cityUserInputService";
import CitySearch from "@/components/CitySearch/CitySearch";

const formSchema = z.object({
  cityId: z.number({ required_error: "City is required." }),
  pros: z.string().optional(),
  cons: z.string().optional(),
  publicTransportation: z.string().optional(),
  weather: z.string().optional(),
  dating: z.string().optional(),
  lgbtq: z.string().optional(),
  diversity: z.string().optional(),
  safetyCrime: z.string().optional(),
  linked: z.boolean().default(false),
});

export default function AddCityUserInput() {
  useAuthGuard();
  const { id } = useParams<{ id: string }>();
  const isUpdate = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linked: false,
    },
  });

  const { control, handleSubmit, reset } = form;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: cityUserInputData, isLoading } = useQuery({
    queryKey: ["cityUserInput", id],
    queryFn: () => cityUserInputService.readCityUserInput(id!),
    enabled: isUpdate,
  });

  useEffect(() => {
    if (cityUserInputData) {
      reset(
        removeNulls({
          cityId: cityUserInputData.cityId,
          pros: cityUserInputData.pros,
          cons: cityUserInputData.cons,
          publicTransportation: cityUserInputData.publicTransportation,
          weather: cityUserInputData.weather,
          dating: cityUserInputData.dating,
          lgbtq: cityUserInputData.lgbtq,
          diversity: cityUserInputData.diversity,
          safetyCrime: cityUserInputData.safetyCrime,
          linked: cityUserInputData.linked,
        })
      );
    }
  }, [cityUserInputData, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      isUpdate
        ? cityUserInputService.updateCityUserInput(id!, values)
        : cityUserInputService.createCityUserInput(values),
    onSuccess: () => {
      notifications.show({
        message: `City User Input ${
          isUpdate ? "updated" : "created"
        } successfully!`,
        withBorder: true,
      });
      queryClient.invalidateQueries({ queryKey: ["city"] });
      navigate("/city");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAsync(values);
  };

  const items = [
    { title: "Cities", to: "/city" },
    { title: isUpdate ? "Edit City Information" : "Add City Information" },
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
          name="cityId"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <CitySearch
                selected={field.value}
                onChange={field.onChange} // Directly updating the form's cityId field with the selected city ID
                label="Select City"
                required={true} // Set to true if the city is a required field
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
          name="pros"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Pros"
              placeholder="Enter pros of the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="cons"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Cons"
              placeholder="Enter cons of the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="publicTransportation"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Public Transportation"
              placeholder="Describe public transportation in the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="weather"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Weather"
              placeholder="Describe the weather in the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="dating"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Dating"
              placeholder="Describe the dating scene in the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="lgbtq"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="LGBTQ+ Friendly"
              placeholder="Describe the LGBTQ+ friendliness of the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="diversity"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Diversity"
              placeholder="Describe the diversity in the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="safetyCrime"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              label="Safety & Crime"
              placeholder="Describe the safety and crime levels in the city"
              error={fieldState.error?.message}
              minRows={3}
              {...field}
            />
          )}
        />

        <Controller
          name="linked"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Link this entry to my profile."
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              size="md"
            />
          )}
        />

        <Button type="submit" loading={isPending}>
          {isUpdate ? "Update City User Input" : "Submit City User Input"}
        </Button>
      </form>
    </div>
  );
}
