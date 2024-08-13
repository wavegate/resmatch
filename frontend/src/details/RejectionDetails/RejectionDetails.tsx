import { Accordion, Badge, Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import rejectionService from "@/services/rejectionService";
import { notifications } from "@mantine/notifications";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";
import {
  FaSignal,
  FaPassport,
  FaPlane,
  FaSuitcaseRolling,
} from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";

export default function RejectionDetails({ item }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => rejectionService.deleteRejection(item.id),
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Rejection deleted successfully",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["rejection"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete the rejection",
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const hasBadges =
    item.graduateType ||
    item.medicalDegree ||
    item.img ||
    (item.medicalDegree === "MD" && item.step2Score) ||
    item.comlex2Score ||
    item.geographicPreference ||
    item.signal ||
    item.visaRequired ||
    item.home ||
    item.away ||
    item.greenCard;

  return (
    <Accordion.Panel>
      <Group justify="apart">
        <Link to={`/rejection/${item.id}`}>
          <Button>Update Rejection</Button>
        </Link>
        <Button
          color="red"
          onClick={handleDelete}
          loading={deleteMutation.isPending}
        >
          Delete Rejection
        </Button>
      </Group>
      {!hasBadges ? (
        <div className={`text-gray-500 text-xs`}>Nothing to show here...</div>
      ) : (
        <div className="inline-flex flex-wrap gap-2 mb-4">
          {item.graduateType && (
            <Badge color="blue" variant="outline">
              {item.graduateType}
            </Badge>
          )}
          {item.medicalDegree && (
            <Badge color="green" variant="outline">
              {item.medicalDegree}
            </Badge>
          )}
          {item.img && (
            <Badge color="red" variant="outline">
              IMG
            </Badge>
          )}
          {item.step2Score && (
            <Badge variant="outline" leftSection={<MdMenuBook size={16} />}>
              <strong>Step 2 Score:</strong> {item.step2Score}
            </Badge>
          )}
          {item.comlex2Score && (
            <Badge variant="outline" leftSection={<MdMenuBook size={16} />}>
              <strong>COMLEX 2 Score:</strong> {item.comlex2Score}
            </Badge>
          )}
          {item.geographicPreference && (
            <Badge variant="outline" leftSection={<FaMapMarkerAlt size={16} />}>
              Geographic Preference
            </Badge>
          )}
          {item.signal && (
            <Badge variant="outline" leftSection={<FaSignal size={16} />}>
              Signal Sent
            </Badge>
          )}
          {item.visaRequired && (
            <Badge variant="outline" leftSection={<FaPassport size={16} />}>
              Visa Required
            </Badge>
          )}
          {item.home && (
            <Badge variant="outline" leftSection={<FaHome size={16} />}>
              Home Program
            </Badge>
          )}
          {item.away && (
            <Badge variant="outline" leftSection={<FaPlane size={16} />}>
              Away Rotation
            </Badge>
          )}
          {item.greenCard && (
            <Badge
              variant="outline"
              leftSection={<FaSuitcaseRolling size={16} />}
            >
              Green Card
            </Badge>
          )}
        </div>
      )}
    </Accordion.Panel>
  );
}
