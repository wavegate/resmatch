import { Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/userService";
import { notifications } from "@mantine/notifications";

export default function UserDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => userService.deleteUser(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "User deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the user",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div>
      <Text>
        <strong>Email:</strong> {item.email}
      </Text>
      <Text>
        <strong>Alias:</strong> {item.alias}
      </Text>
      <Text>
        <strong>Is Confirmed:</strong> {item.isConfirmed ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>Green Card:</strong> {item.greenCard ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>Visa Required:</strong> {item.visaRequired ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>ECFMG Certified:</strong> {item.ecfmgCertified ? "Yes" : "No"}
      </Text>
      <Text>
        <strong>Step 1 Score:</strong> {item.step1Score || "N/A"}
      </Text>
      <Text>
        <strong>Step 2 Score:</strong> {item.step2Score || "N/A"}
      </Text>
      <Text>
        <strong>Step 3 Score:</strong> {item.step3Score || "N/A"}
      </Text>
      <Text>
        <strong>School Ranking:</strong> {item.schoolRanking || "N/A"}
      </Text>
      <Text>
        <strong>Year of Graduation:</strong> {item.yearOfGraduation || "N/A"}
      </Text>
      <Text>
        <strong>Months of USCE:</strong> {item.monthsOfUSCE || "N/A"}
      </Text>
      <Text>
        <strong>Number of Publications:</strong> {item.numPublications || "N/A"}
      </Text>
      <Text>
        <strong>Number of Work Experiences:</strong>{" "}
        {item.numWorkExperiences || "N/A"}
      </Text>
      <Text>
        <strong>Number of Volunteer Experiences:</strong>{" "}
        {item.numVolunteerExperiences || "N/A"}
      </Text>
      <Text>
        <strong>Other Degrees:</strong> {item.otherDegrees || "N/A"}
      </Text>
      <Text>
        <strong>Application Year:</strong> {item.applicationYear || "N/A"}
      </Text>
    </div>
  );
}
