import {
  Anchor,
  AppShell,
  Burger,
  Button,
  LoadingOverlay,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiMentalHealthLine } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { HiOutlineChat, HiOutlineHome } from "react-icons/hi";
import { PiHospital } from "react-icons/pi";
import {
  FaBalanceScale,
  FaBalanceScaleLeft,
  FaCalendarAlt,
  FaChartBar,
  FaCity,
  FaClipboardList,
  FaComments,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaEye,
  FaHandshake,
  FaListOl,
  FaListUl,
  FaMapSigns,
  FaMedal,
  FaMicroscope,
  FaQuestionCircle,
  FaRegCalendarMinus,
  FaSkullCrossbones,
  FaSortAmountUp,
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaThumbsUp,
  FaTimesCircle,
  FaUserFriends,
  FaUserGraduate,
  FaUserMd,
} from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import useUser from "@/hooks/useUser";
import Sidebar from "@/components/Sidebar/Sidebar";

const routes = [
  {
    heading: "Main Chat",
    items: [
      {
        link: "/main-chat",
        text: "Main Chat",
        icon: <HiOutlineChat className="h-5 w-5" />, // Example icon, replace as needed
      },
    ],
  },
  {
    heading: "Interview Info",
    items: [
      {
        link: "/iv-offers",
        text: "IV Offers",
        icon: <FaRegCalendarCheck className="h-5 w-5" />,
      },
      {
        link: "/iv-rejections",
        text: "IV Rejections",
        icon: <FaTimesCircle className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/iv-dropped",
        text: "IV Dropped",
        icon: <FaRegCalendarMinus className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/iv-logistics",
        text: "IV Logistics/Open Spots",
        icon: <FaMapSigns className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/iv-questions",
        text: "IV Questions",
        icon: <FaQuestionCircle className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/iv-impressions",
        text: "IV Impressions",
        icon: <FaThumbsUp className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/loi-response",
        text: "LOInterest Response",
        icon: <FaEnvelopeOpenText className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/loi-intent",
        text: "LOIntent Response",
        icon: <FaEnvelope className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/post-iv-communication",
        text: "Post-IV Communication",
        icon: <FaComments className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/second-look",
        text: "Second Look",
        icon: <FaEye className="h-5 w-5" />, // Example icon, replace as needed
      },
    ],
  },
  {
    heading: "Applicant Info",
    items: [
      {
        link: "/applicant-data",
        text: "Applicant Data",
        icon: <FaUserGraduate className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/img-applicant-data",
        text: "IMG Applicant Data",
        icon: <FaUserMd className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/rank-tally",
        text: "Rank Tally",
        icon: <FaChartBar className="h-5 w-5" />, // Example icon, replace as needed
      },
    ],
  },
  {
    heading: "Program Info",
    items: [
      {
        link: "/name-fame-shame",
        text: "Name Fame/Shame",
        icon: <FaMedal className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/m4-intern-impressions",
        text: "M4/Intern Impressions",
        icon: <FaClipboardList className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/malignant",
        text: "Malignant",
        icon: <FaSkullCrossbones className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/program-schedule",
        text: "Program Schedule/Details",
        icon: <FaCalendarAlt className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/fellowship-match",
        text: "Fellowship Match",
        icon: <FaHandshake className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/pstp",
        text: "PSTP",
        icon: <FaMicroscope className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/tier-list",
        text: "Tier List",
        icon: <FaListUl className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/tier-list-img",
        text: "Tier List (IMG)",
        icon: <FaListOl className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/x-vs-y",
        text: "X vs Y",
        icon: <FaBalanceScale className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/x-vs-y-img",
        text: "X vs Y (IMG)",
        icon: <FaBalanceScaleLeft className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/cities",
        text: "Cities",
        icon: <FaCity className="h-5 w-5" />, // Example icon, replace as needed
      },
    ],
  },
  {
    heading: "Rank Data",
    items: [
      {
        link: "/unofficial-rank-lists-md",
        text: "Unofficial Rank Lists (MD)",
        icon: <FaSortNumericDown className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/unofficial-rank-lists-do",
        text: "Unofficial Rank Lists (DO)",
        icon: <FaSortNumericDownAlt className="h-5 w-5" />, // Example icon, replace as needed
      },
      {
        link: "/unofficial-rank-lists-img",
        text: "Unofficial Rank Lists (IMG)",
        icon: <FaSortAmountUp className="h-5 w-5" />, // Example icon, replace as needed
      },
    ],
  },
];

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

export default () => {
  const { user, signOut, isLoading } = useUser();
  const [opened, { toggle }] = useDisclosure();

  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      className={`text-gray-900`}
    >
      <AppShell.Header>
        <header
          className={`flex justify-between px-8 max-sm:px-4 h-full items-center`}
        >
          <div className={`flex gap-4`}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Link className={`items-center flex gap-3`} to={"/"}>
              <RiMentalHealthLine size={24} />
              <h1 className={`font-medium text-xl`}>Residency Match</h1>
            </Link>
          </div>
          <div className={`flex gap-4 max-sm:hidden relative`}>
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 1 }}
              loaderProps={{ size: "sm" }}
            />
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
            {user && <Button onClick={signOut}>Sign out</Button>}
          </div>
        </header>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        className={`flex flex-col gap-4 h-full overflow-y-auto`}
      >
        <Sidebar
          toggle={toggle}
          isLoading={isLoading}
          user={user}
          signOut={signOut}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      {/* <AppShell.Footer>
        <div className={`${classes.footer} max-sm:hidden`}>
          <div className={classes.inner}>
            <Logo />
            <Group className={classes.links}>{items}</Group>
            <Group gap="xs" justify="flex-end" wrap="nowrap">
              <ActionIcon size="lg" variant="default" radius="xl">
                <FaTwitter style={{ width: rem(18), height: rem(18) }} />
              </ActionIcon>
              <ActionIcon size="lg" variant="default" radius="xl">
                <FaYoutube style={{ width: rem(18), height: rem(18) }} />
              </ActionIcon>
              <ActionIcon size="lg" variant="default" radius="xl">
                <IoLogoLinkedin style={{ width: rem(18), height: rem(18) }} />
              </ActionIcon>
            </Group>
          </div>
        </div>
        <div className={`flex sm:hidden justify-center`}>
          {routes.slice(0, 3).map((route, index) => {
            return (
              <NavLink
                key={index}
                to={route.link}
                className={({ isActive }) =>
                  `flex flex-col px-4 py-2 text-sm items-center ${
                    isActive
                      ? "text-blue-900 bg-primary bg-opacity-20"
                      : "text-gray-600"
                  }`
                }
              >
                <div className={``}>{route.icon}</div>
                <div className={`text-xs`}>{route.text}</div>
              </NavLink>
            );
          })}
        </div>
      </AppShell.Footer> */}
    </AppShell>
  );
};
