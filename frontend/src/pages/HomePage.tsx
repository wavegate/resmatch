import PastSpreadsheets from "@/components/PastSpreadsheets/PastSpreadsheets";
import TimeRangeChart from "@/components/TimeRangeChart/TimeRangeChart";
import {
  Card,
  Title,
  Text,
  List,
  Avatar,
  Group,
  SimpleGrid,
  Blockquote,
} from "@mantine/core";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default () => {
  // Calculate days until Match Day
  const [daysUntilMatch, setDaysUntilMatch] = useState(0);

  useEffect(() => {
    const matchDay = dayjs("2025-03-20"); // Updated Match Day
    const today = dayjs();
    const diffDays = matchDay.diff(today, "day");
    setDaysUntilMatch(diffDays);
  }, []);

  return (
    <div className="space-y-8">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group align="center" spacing="sm" className="mb-4">
          <Avatar
            src="https://media.thv11.com/assets/CCT/images/ee7b830e-7693-4dd9-9902-f0f72cc59b00/ee7b830e-7693-4dd9-9902-f0f72cc59b00_750x422.jpg"
            alt="Haunting_Welder"
            radius="xl"
            size="lg"
          />
          <div>
            <Title order={2} className="font-medium">
              Welcome Internal Medicine Class of 2025!
            </Title>
            <Text size="sm" c="dimmed">
              Haunting_Welder
            </Text>
          </div>
        </Group>
        <Text className="mb-4">
          The traditional residency application spreadsheets are often stressful
          due to sabotage and ownership issues. I experienced this firsthand as
          a member of the Class of 2021. Inspired by my peers, I created this
          user-friendly and secure platform to enhance the residency application
          process.
        </Text>

        {/* Key Features Section */}
        <Title order={3} className="font-medium mt-4 mb-2">
          Key Features
        </Title>
        <List spacing="xs" size="sm" icon="•">
          <List.Item>
            <Text size="sm">
              <strong>Authentication:</strong> Only moderators can edit other
              users' data. This prevents sabotage and keeps information secure.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm">
              <strong>Anonymity:</strong> All information you provide will be
              anonymous by default, which means it cannot be visibly tied to
              your account. You can, however, link your profile to your
              information if you like.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm">
              <strong>Decentralized ownership:</strong> I will backup data every
              few days, and will release a Excel spreadsheet with all data every
              few weeks, free to download.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm">
              <strong>Stability:</strong> I am happy to maintain this
              application year to year, as well as can extend to other
              specialties if things work out. The code is also open-source, so
              if something happens to me, other people can jump in and keep the
              application running.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm">
              <strong>Extensibility:</strong> I will improve the application
              over time. Your feedback (see{" "}
              <Link className={`text-blue-500 underline`} to="/mod-report">
                Mod Reports
              </Link>
              ) will be super useful for this.
            </Text>
          </List.Item>
        </List>

        <SimpleGrid cols={{ sm: 2 }} spacing="lg" className="mt-8">
          {/* Countdown Section */}
          <div>
            <Title order={3} className="font-medium mb-2">
              Countdown to Match Day
            </Title>
            <Text className="mb-4">
              Only <strong>{daysUntilMatch}</strong> days until Match Day!
            </Text>
          </div>

          {/* Past Spreadsheets Component */}
          <PastSpreadsheets />
        </SimpleGrid>

        {/* Urgent Questions Section */}
        <Title order={3} className="font-medium mt-4 mb-2">
          Urgent Questions or Concerns?
        </Title>
        <Text className="mb-4">
          Message <strong>@dingo5071</strong> on Discord or{" "}
          <a
            href="https://www.reddit.com/user/Haunting_Welder/"
            className="text-blue-600"
          >
            Haunting_Welder on Reddit
          </a>
          .
        </Text>
      </Card>
    </div>
  );
};
