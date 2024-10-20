import PastSpreadsheets from "@/components/PastSpreadsheets/PastSpreadsheets";
import TimeRangeChart from "@/components/TimeRangeChart/TimeRangeChart";
import { Card, Button, Divider } from "@mantine/core";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import Analytics from "./Analytics";

const HomePage = () => {
  // Calculate days until Match Day
  const [daysUntilMatch, setDaysUntilMatch] = useState(0);

  useEffect(() => {
    const matchDay = dayjs("2025-03-20"); // Updated Match Day
    const today = dayjs();
    const diffDays = matchDay.diff(today, "day");
    setDaysUntilMatch(diffDays);
  }, []);

  return (
    <div className={`p-2`}>
      <Helmet>
        <title>{APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-4`}>
        <div className={`max-xl:flex-col flex justify-between gap-4`}>
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
            </div>
          </div>
          <div
            className={`flex max-sm:flex-col items-start gap-4 max-sm:flex-col-reverse`}
          >
            <Link
              to="https://discord.com/invite/FnC4TdMHEA"
              target="_blank"
              className={`text-blue-500 hover:underline font-medium text-md text-nowrap flex gap-2 items-center rounded-lg bg-primary bg-opacity-5 px-2 pr-3 py-2 w-fit max-sm:m-auto`}
            >
              <div className={`rounded-lg bg-primary bg-opacity-20 p-2`}>
                <FaDiscord />
              </div>
              2025 IM Discord
            </Link>
            <Link to="/interviewInvite" className={`max-sm:m-auto`}>
              <Button size="lg">Share Interview Invite</Button>
            </Link>
          </div>
        </div>
        <div className={`sm:hidden flex flex-col items-stretch gap-2`}>
          <Link to="/applicant-us" className={`w-full`}>
            <Button className={`w-full`} variant="outline">
              View applicants
            </Button>
          </Link>
          <Link to="/program" className={`w-full`}>
            <Button className={`w-full`} variant="outline">
              View programs
            </Button>
          </Link>
        </div>
        <Analytics />
        <div className={`grid grid-cols-[2fr_1fr] gap-4 max-sm:grid-cols-1`}>
          <div className={`flex flex-col gap-4`}>
            {/* <Card shadow="sm" withBorder className={`flex flex-col gap-4`}>
              <h4 className={`font-medium text-xl`}>
                Total Interview Invites This Cycle
              </h4>
              <TimeRangeChart />
            </Card> */}

            <Card
              shadow="sm"
              withBorder
              className={`flex flex-col gap-4 max-sm:hidden`}
            >
              <h3 className={`font-medium text-xl`}>About Residency Match</h3>
              <ul className={`list-disc pl-6 flex flex-col gap-4`}>
                <li>
                  <strong>Authentication:</strong> Only moderators can edit
                  other users' data. This prevents sabotage and keeps
                  information secure.
                </li>
                <li>
                  <strong>Anonymity:</strong> The app is designed to encourage
                  information sharing and free access to information. However,
                  every input has an option to be anonymous if there is concern
                  for privacy.
                </li>
                <li>
                  <strong>Decentralized ownership:</strong> Data is
                  automatically backed up every few days, and data is available
                  for download on each page as a CSV file.
                </li>
                <li>
                  <strong>Stability:</strong> I am happy to maintain this
                  application year to year, as well as can extend to other
                  specialties if things work out.
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
                <Link className={`text-blue-500 underline`} to="/mod-report">
                  Mod Reports
                </Link>
                ) will be super useful for this.
              </li>
            </ul>
          </Card>
          <Card
            shadow="sm"
            withBorder
            className={`flex flex-col gap-4 max-h-[500px] col-span-2 overflow-y-auto`}
          >
            <h4 className={`font-medium text-xl`}>Changelog</h4>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>10/20/2024</div>
              <div>Home page quick glance.</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>10/15/2024</div>
              <div>Column width and order is saved.</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>10/5/2024</div>
              <div>Reddit login.</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>10/3/2024</div>
              <div>Comment reply notifications.</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/22/2024</div>
              <div>
                Load data into program details page, load data into user profile
                page, imported logistics, impressions, questions,
                postIVCommunication, second looks from last year
              </div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/19/2024</div>
              <div>Rebuild tier lists</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/17/2024</div>
              <div>Upvotes</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/16/2024</div>
              <div>Follow programs</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/14/2024</div>
              <div>Default to list view on mobile, start details page</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/11/2024</div>
              <div>Clean up list views</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/7/2024</div>
              <div>Added Google login</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/6/2024</div>
              <div>Table views + export to CSV, full screen tables</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/5/2024</div>
              <div>Program table view</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/4/2024</div>
              <div>M4/Intern imperssions imported</div>
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`font-medium`}>9/3/2024</div>
              <div>Schedule details, malignant, fame shame imported</div>
            </div>
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

        <Divider />
        <div className={`gap-2 mt-1 flex flex-col items-center`}>
          <div>
            © {new Date().getFullYear()} Residency Match. All Rights Reserved.
          </div>
          <div className={`w-full flex justify-evenly`}>
            <Link to="/privacy-policy" className={`text-blue-500 underline`}>
              Privacy Policy
            </Link>{" "}
            <Link to="/terms-of-service" className={`text-blue-500 underline`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
