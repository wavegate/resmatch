import { Card } from "@mantine/core";
import ProfileRow from "./ProfileRow";

const ProfileCard = ({ records, title }) => {
  return (
    <Card withBorder radius="lg">
      <Card.Section withBorder className={`p-4 max-sm:px-3 max-sm:py-2`}>
        <h2 className={`text-xl font-medium max-sm:text-lg`}>{title}</h2>
      </Card.Section>
      <Card.Section withBorder>
        <div className={`flex flex-col gap-4`}>
          <div className={`grid grid-cols-[auto_1fr] gap-x-8`}>
            {records.map((record, index) => (
              <ProfileRow
                key={record.label} // Using label as the key assuming it's unique
                label={record.label}
                value={record.value}
                description={record.description} // Only pass description if it exists
                gray={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </Card.Section>
    </Card>
  );
};

export default ProfileCard;
