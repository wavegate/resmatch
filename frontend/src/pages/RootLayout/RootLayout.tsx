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
  FaInfoCircle,
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
