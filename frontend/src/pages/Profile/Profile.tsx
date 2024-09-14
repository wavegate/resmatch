import { useQuery } from "@tanstack/react-query";
import { Text, Button, Avatar } from "@mantine/core";
import userService from "@/services/userService";
import useUser from "@/hooks/useUser";
import { Link, useParams } from "react-router-dom";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import useAuthGuard from "@/hooks/useAuthGuard";
import {
  convertToBinnedValue,
  convertToYesNo,
  generateGravatarUrl,
} from "@/utils/utils";

import { FaDiscord, FaRedditAlien } from "react-icons/fa";
import ProfileCard from "./ProfileCard";
import { useMemo } from "react";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";

function displayStep1Result(data) {
  if (data.step1Score) {
    return convertToBinnedValue(data.step1Score);
  } else if (data.step1ScorePass === true) {
    return "Pass";
  } else if (data.step1ScorePass === false) {
    return "Fail";
  } else {
    return "";
  }
}

export default function Profile() {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id ? id : user?.id],
    queryFn: () => userService.readUser(id ? id : user?.id),
    enabled: !!(user || id),
  });

  useAuthGuard({ guard: !id });

  const tests = useMemo(() => {
    if (data) {
      return [
        {
          label: "Step 1",
          value: displayStep1Result(data),
        },
        {
          label: "Step 2 CK",
          value: convertToBinnedValue(data.step2Score),
        },
        {
          label: "Step 3",
          value: convertToBinnedValue(data.step3Score),
        },
        {
          label: "COMLEX 1",
          value:
            data.comlex1ScorePass === true
              ? "Pass"
              : data.comlex1ScorePass === false
              ? "Fail"
              : "",
        },
        {
          label: "COMLEX 2 CE",
          value: convertToBinnedValue(data.comlex2Score),
        },
      ];
    }
  }, [data]);

  const testsCard = {
    title: "Tests",
    records: tests,
  };

  const academics = useMemo(() => {
    if (data) {
      return [
        {
          label: "School rank",
          value: fieldLabelMap.schoolRanking[data.schoolRanking],
        },
        {
          label: "Class rank",
          value: fieldLabelMap.classRank[data.classRank],
        },
        {
          label: "Clerkship grades",
          description: "Honors · High pass · Pass · Fail",
          value: [data.honors, data.highPass, data.pass, data.fail]
            .map((x) => {
              if (x !== null) {
                return x;
              } else {
                return "?";
              }
            })
            .join(" · "),
        },
        {
          label: "Other degrees",
          value: data.otherDegrees,
        },
        {
          label: "Alpha Omega Alpha",
          value: convertToYesNo(data.aoa),
        },
        {
          label: "Gold Humanism",
          value: convertToYesNo(data.goldHumanism),
        },
        {
          label: "Sigma Sigma Phi",
          value: convertToYesNo(data.sigmaSigmaPhi),
        },
      ];
    }
  }, [data]);

  const academicsCard = {
    title: "Academics",
    records: academics,
  };

  const extracurriculars = useMemo(() => {
    if (data) {
      return [
        {
          label: "Publications",
          value: data.numPublications,
        },
        {
          label: "Work experiences",
          value: data.numWorkExperiences,
        },
        {
          label: "Volunteer experiences",
          value: data.numVolunteerExperiences,
        },
        {
          label: "Red flags",
          value: convertToYesNo(data.redFlags),
        },
        {
          label: "Red flags explanation",
          value: data.redFlagsExplanation,
        },
      ];
    }
  }, [data]);

  const extracurricularsCard = {
    title: "Extracurriculars",
    records: extracurriculars,
  };

  const applications = useMemo(() => {
    if (data) {
      return [
        {
          label: "Applications",
          value: data.numApplications,
        },
        {
          label: "Interviews",
          value: data.numInterviews,
        },
        {
          label: "Dropped",
          value: data.numWithdrawn,
        },
        {
          label: "Rejected",
          value: data.numRejected,
        },
        {
          label: "Waitlisted",
          value: data.numWaitlisted,
        },
      ];
    }
  }, [data]);

  const applicationsCard = {
    title: "Applications",
    records: applications,
  };

  const imgInfo = useMemo(() => {
    if (data) {
      return [
        {
          label: "Visa required",
          value: convertToYesNo(data.visaRequired),
        },
        {
          label: "Green card",
          value: convertToYesNo(data.greenCard),
        },
        {
          label: "Months of USCE",
          value: data.monthsOfUSCE,
        },
        {
          label: "ECFMG Certified",
          value: convertToYesNo(data.ecfmgCertified),
        },
        {
          label: "Step 2 CS Pathway",
          value: fieldLabelMap.step2CSPathway[data.step2CSPathway],
        },
      ];
    }
  }, [data]);

  const imgCard = {
    title: "IMG Details",
    records: imgInfo,
  };

  if (data && !data.public && data.id !== user?.id) {
    return <div>This user's profile is not public.</div>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading profile</Text>;
  }

  return (
    <>
      <Helmet>
        <title>Profile | {APP_NAME}</title>
      </Helmet>
      <div>
        {data && (
          <div className={`flex flex-col gap-6 max-sm:gap-4`}>
            <header
              className={`flex justify-between gap-4 max-sm:flex-col relative`}
            >
              <div className={`flex items-center gap-4`}>
                <Avatar
                  size="50"
                  src={generateGravatarUrl(String(data.id) || "", 40)}
                />
                <div className={`flex flex-col`}>
                  <div
                    className={`text-3xl font-semibold max-sm:text-xl max-sm:max-w-[180px] max-sm:truncate`}
                  >
                    {data.alias}
                  </div>
                  <div className={`flex gap-1 flex-wrap items-center`}>
                    {data.role === "Admin" && (
                      <div
                        className={`text-pink-500 text-xs border border-solid border-pink-500 rounded-full w-fit px-1`}
                      >
                        Admin
                      </div>
                    )}
                    <div
                      className={`text-blue-500 text-xs border border-solid border-blue-500 rounded-full w-fit px-1`}
                    >
                      {data.graduateType === "US"
                        ? "US"
                        : data.img
                        ? fieldLabelMap.img[data.img]
                        : "IMG"}
                    </div>
                    {data.medicalDegree && data.graduateType !== "IMG" && (
                      <div
                        className={`text-blue-500 text-xs border border-solid border-blue-500 rounded-full w-fit px-1`}
                      >
                        {data.medicalDegree}
                      </div>
                    )}
                    {data.pstp && (
                      <div
                        className={`text-blue-500 text-xs border border-solid border-blue-500 rounded-full w-fit px-1`}
                      >
                        PSTP
                      </div>
                    )}
                    {!id && (
                      <>
                        <div>·</div>
                        <Link
                          to={`/user/add/${user.id}`}
                          className={`text-gray-500 underline text-sm`}
                        >
                          Edit profile
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {(data.redditLink || data.discordLink) && (
                <div
                  className={`text-right flex flex-col gap-1 max-sm:absolute -right-4 -top-4`}
                >
                  <div
                    className={`text-gray-500 text-sm whitespace-nowrap max-sm:hidden`}
                  >
                    Message me:
                  </div>
                  <div className={`flex gap-2 justify-end max-sm:gap-0`}>
                    {data.discordLink && (
                      <Button
                        className={`px-2 py-1 rounded-full max-sm:rounded-none max-sm:px-3 max-sm:rounded-bl-xl`}
                        variant="light"
                      >
                        <FaDiscord className={`text-lg`} />
                      </Button>
                    )}
                    {data.redditLink && (
                      <Button
                        className={`px-2 py-1 rounded-full max-sm:rounded-none max-sm:px-3`}
                        variant="light"
                      >
                        <FaRedditAlien className={`text-lg`} />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </header>
            <div className={`grid grid-cols-2 gap-4 max-lg:grid-cols-1`}>
              <ProfileCard {...testsCard} />
              <ProfileCard {...academicsCard} />
              {data.graduateType === "IMG" && <ProfileCard {...imgCard} />}
              <ProfileCard {...applicationsCard} />
              <ProfileCard {...extracurricularsCard} />
            </div>
            {/* <Tabs defaultValue="ivOffers" variant="outline">
            <Tabs.List>
              <Tabs.Tab
                value="ivOffers"
                leftSection={<FaRegCalendarCheck />}
                className={`text-base`}
              >
                IV Offers
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="ivOffers">Coming soon</Tabs.Panel>
          </Tabs> */}
          </div>
        )}
      </div>
    </>
  );
}
