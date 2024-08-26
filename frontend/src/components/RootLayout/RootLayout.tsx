import { AppShell, Burger, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";
import { RiMentalHealthLine } from "react-icons/ri";
import useUser from "@/hooks/useUser";
import Sidebar from "@/components/Sidebar/Sidebar";

export default () => {
  const { user, signOut, isLoading } = useUser();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={{ base: "16", sm: "32" }}
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
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        className={`flex flex-col gap-4  overflow-y-auto`}
      >
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
