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
    <div className={`flex flex-col gap-4`}>
      <div className={`flex flex-col gap-4`}>
        <h1 className={`font-medium text-3xl max-sm:text-xl`}>
          Welcome Internal Medicine Class of 2025!
        </h1>
        <div className={``}>
          <h4 className="font-medium">Urgent Questions or Concerns?</h4>
          <div className="mb-4">
            Message <strong>@dingo5071</strong> on Discord or{" "}
            <a
              href="https://www.reddit.com/user/Haunting_Welder/"
              className="text-blue-600"
            >
              Haunting_Welder
            </a>{" "}
            on Reddit .
          </div>

          <Link
            to="https://discord.com/invite/FnC4TdMHEA"
            target="_blank"
            className={`text-blue-500 hover:underline font-medium text-lg`}
          >
            2025 IM Discord
          </Link>
        </div>
      </div>
      <div className={`grid grid-cols-[2fr_1fr] gap-4 max-sm:grid-cols-1`}>
        <div className={`flex flex-col gap-4 max-sm:hidden`}>
          <Card shadow="sm" withBorder className={`flex flex-col gap-4`}>
            <h4 className={`font-medium text-xl`}>
              Total Interview Invites This Cycle
            </h4>
            <TimeRangeChart />
          </Card>

          <Card shadow="sm" withBorder className={`flex flex-col gap-4`}>
            <h3 className={`font-medium text-xl`}>About Residency Match</h3>
            <ul className={`list-disc pl-6 flex flex-col gap-4`}>
              <li>
                <strong>Authentication:</strong> Only moderators can edit other
                users' data. This prevents sabotage and keeps information
                secure.
              </li>
              <li>
                <strong>Anonymity:</strong> The app is designed to encourage
                information sharing and free access to information. However,
                every input has an option to be anonymous if there is concern
                for privacy. The Malignant and Fame/Shame tabs are anonymous by
                default.
              </li>
              <li>
                <strong>Decentralized ownership:</strong> I will backup data
                every few days. Upon request, I can provide an Excel spreadsheet
                with personal information desanitized available for download.
              </li>
              <li>
                <strong>Stability:</strong> I am happy to maintain this
                application year to year, as well as can extend to other
                specialties if things work out. The code is also open-source, so
                if something happens to me, other people can jump in and keep
                the application running.
              </li>
              <li>
                <strong>Extensibility:</strong> I will improve the application
                over time. Your feedback (see{" "}
                <Link className={`text-blue-500 underline`} to="/report">
                  Mod Reports
                </Link>
                ) will be super useful for this.
              </li>
            </ul>
          </Card>
        </div>
        <div className={`flex flex-col gap-4`}>
          <Card shadow="sm" withBorder className={`flex flex-col gap-2`}>
            <div className={`text-xl font-medium`}>Match Day In</div>
            <div className={`flex flex-col items-center gap-2`}>
              <div className={`flex gap-2 items-end`}>
                <div className={`text-4xl font-medium`}>{daysUntilMatch}</div>
                <div className={`text-xl font-medium`}>Days</div>
              </div>
              <div className={`font-medium`}>Until 3/21/2025</div>
            </div>
          </Card>
          <Card shadow="sm" withBorder>
            <PastSpreadsheets />
          </Card>

          <Card
            shadow="sm"
            withBorder
            className={`flex flex-col gap-4 max-h-[500px] overflow-y-auto`}
          >
            <h4 className={`font-medium text-xl`}>Changelog</h4>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>8/26/2024</div>
              <div>Missing programs imported, connected to cities</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>8/21/2024</div>
              <div>Updated profile page</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>8/19/2024</div>
              <div>Application launched!</div>
            </div>
          </Card>
        </div>
        <Card
          shadow="sm"
          withBorder
          className={`flex-col gap-4 hidden max-sm:flex`}
        >
          <h3 className={`font-medium text-xl`}>About Residency Match</h3>
          <ul className={`list-disc pl-6 flex flex-col gap-4`}>
            <li>
              <strong>Authentication:</strong> Only moderators can edit other
              users' data. This prevents sabotage and keeps information secure.
            </li>
            <li>
              <strong>Anonymity:</strong> The app is designed to encourage
              information sharing and free access to information. However, every
              input has an option to be anonymous if there is concern for
              privacy. The Malignant and Fame/Shame tabs are anonymous by
              default.
            </li>
            <li>
              <strong>Decentralized ownership:</strong> I will backup data every
              few days. Upon request, I can provide an Excel spreadsheet with
              personal information desanitized available for download.
            </li>
            <li>
              <strong>Stability:</strong> I am happy to maintain this
              application year to year, as well as can extend to other
              specialties if things work out. The code is also open-source, so
              if something happens to me, other people can jump in and keep the
              application running.
            </li>
            <li>
              <strong>Extensibility:</strong> I will improve the application
              over time. Your feedback (see{" "}
              <Link className={`text-blue-500 underline`} to="/mod-report">
                Mod Reports
              </Link>
              ) will be super useful for this.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
