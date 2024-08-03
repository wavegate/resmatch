import { AppShell, Burger, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiMentalHealthLine } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { PiHospital } from "react-icons/pi";
import useUser from "@/hooks/useUser";

const routes = [
  {
    link: "/",
    text: "Home",
    icon: <HiOutlineHome className="h-5 w-5" />,
  },
  {
    link: "/interview-invites",
    text: "Interview Invites",
    icon: <FaRegCalendarCheck className="h-5 w-5" />,
  },
  {
    link: "/programs",
    text: "Programs",
    icon: <PiHospital className="h-5 w-5" />,
  },
];

export default () => {
  const { user, signOut, isLoading } = useUser();
  const [opened, { toggle }] = useDisclosure();

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
            <div className={`items-center flex gap-3`}>
              <RiMentalHealthLine size={24} />
              <h1 className={`font-medium text-xl`}>Residency Match</h1>
            </div>
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

      <AppShell.Navbar p="md" className={`flex flex-col gap-4`}>
        <div className={`flex flex-col gap-4`}>
          {routes.map((route, index) => {
            return (
              <NavLink
                key={index}
                to={route.link}
                className={({ isActive }) =>
                  `flex gap-4 px-4 py-2 hover:bg-blue-100 rounded font-medium items-center ${
                    isActive ? "text-blue-900 bg-blue-100" : "text-gray-600"
                  }`
                }
                onClick={toggle}
              >
                <div className={``}>{route.icon}</div>
                <div className={``}>{route.text}</div>
              </NavLink>
            );
          })}
        </div>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        >
          <div className={`flex gap-4 sm:hidden`}>
            {!user && (
              <>
                <Link to="/login" onClick={toggle}>
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to="/sign-up" onClick={toggle}>
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
            {user && (
              <Button
                onClick={() => {
                  signOut();
                  toggle();
                }}
              >
                Sign out
              </Button>
            )}
          </div>
        </LoadingOverlay>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
