import { Accordion, Badge, Button, Group } from "@mantine/core";
import {
  FaMapMarkerAlt,
  FaSignal,
  FaPassport,
  FaHome,
  FaPlane,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import inviteService from "@/services/inviteService";
import { notifications } from "@mantine/notifications";

interface InviteDetailsProps {
  item: any; // Replace with the correct type if available
}

export default function InviteDetails({ item }: InviteDetailsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deleteInvite } = useMutation({
    mutationFn: () => inviteService.deleteInvite(item.id),
    onSuccess: () => {
      notifications.show({
        message: "Invite deleted successfully!",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["invite"] });
      navigate("/invite");
    },
    onError: () => {
      notifications.show({
        message: "Failed to delete invite",
        color: "red",
      });
    },
  });

  const handleDelete = async () => {
    await deleteInvite();
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

      <Group>
        <Link to={`/invite/${item.id}`}>
          <Button variant="outline" size="xs">
            Edit Invite
          </Button>
        </Link>
        <Button variant="outline" size="xs" color="red" onClick={handleDelete}>
          Delete Invite
        </Button>
      </Group>
    </Accordion.Panel>
  );
}
