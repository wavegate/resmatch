import {
  AppShell,
  Avatar,
  Burger,
  Button,
  LoadingOverlay,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";
import { RiLogoutBoxRLine, RiMentalHealthLine } from "react-icons/ri";
import useUser from "@/hooks/useUser";
import Sidebar from "@/components/Sidebar/Sidebar";
import UserLink from "../UserLink";
import { generateGravatarUrl } from "@/utils/utils";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoLogInOutline } from "react-icons/io5";

export default () => {
  const { user, signOut, isLoading } = useUser();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: { base: 50, sm: 60 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={{ base: "8", sm: "24" }}
      className={`text-gray-900`}
    >
      <AppShell.Header className={`flex items-center`}>
        <div
          className={`flex justify-between px-8 max-sm:px-4 w-full items-center`}
        >
          <div className={`flex gap-4`}>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              className={`burger`}
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
              className={`burger`}
            />
            <Link className={`items-center flex gap-3`} to={"/"}>
              <RiMentalHealthLine size={24} />
              <h1 className={`font-medium text-xl max-sm:text-lg`}>
                Residency Match
              </h1>
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
            {user && (
              <>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Button variant="default" className={`rounded-3xl`}>
                      Logged in as:{" "}
                      <div className={`flex gap-2 items-center ml-4`}>
                        <Avatar
                          size="16"
                          src={generateGravatarUrl(String(user?.id) || "", 40)}
                        />
                        <div>{user?.alias || "-"}</div>
                      </div>
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<HiOutlineUserCircle />}
                      component={Link}
                      to="/profile"
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<RiLogoutBoxRLine />}
                      onClick={signOut}
                    >
                      Sign out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </div>
          {user && (
            <div className={`sm:hidden`}>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="default" className={`rounded-full px-1.5`}>
                    <div className={`flex gap-2 items-center`}>
                      <Avatar
                        size="23"
                        src={generateGravatarUrl(String(user?.id) || "", 40)}
                      />
                    </div>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<HiOutlineUserCircle />}
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<RiLogoutBoxRLine />}
                    onClick={signOut}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          )}
          {!user && (
            <div className={`sm:hidden`}>
              <Link to="/login">
                <Button variant="default" className={`rounded-full`} size="xs">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md" className={`flex flex-col gap-4 overflow-y-auto`}>
        <Sidebar
          toggleMobile={toggleMobile}
          isLoading={isLoading}
          user={user}
          signOut={signOut}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
