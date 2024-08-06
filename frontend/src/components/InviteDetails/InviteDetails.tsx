import { Badge } from "@mantine/core";
import {
  FaMapMarkerAlt,
  FaSignal,
  FaPassport,
  FaHome,
  FaPlane,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

const ItemDetails = ({ item }) => {
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

  if (!hasBadges) {
    return (
      <div className={`text-gray-500 text-xs`}>Nothing to show here...</div>
    );
  }
  return (
    <div className="inline-flex flex-wrap gap-2">
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
          {/* Add a chart next to Step 2 Score */}
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
        <Badge variant="outline" leftSection={<FaSuitcaseRolling size={16} />}>
          Green Card
        </Badge>
      )}
    </div>
  );
};

export default ItemDetails;
