import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, LoadingOverlay, Collapse } from "@mantine/core";
import {
  HiHome,
  HiOutlineChat,
  HiOutlineUserCircle,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for collapse/expand
import menuRoutes from "./menuRoutes";
import useUser from "@/hooks/useUser"; // Import the useUser hook

const Sidebar = ({ toggleMobile, isLoading, signOut }) => {
  const { user } = useUser(); // Get the user from the useUser hook
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <div className={`flex gap-3 sm:hidden relative`}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
          loaderProps={{ size: "sm" }}
        />
        {!user && (
          <>
            <Link to="/login" onClick={toggleMobile}>
              <Button variant="default" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/sign-up" onClick={toggleMobile}>
              <Button size="sm">Sign up</Button>
            </Link>
          </>
        )}
        {user && (
          <Button onClick={signOut} size="sm">
            Sign out
          </Button>
        )}
      </div>
      {menuRoutes.map((group, groupIndex) => {
        // Check if the route should be rendered based on the auth status
        if (group.auth === "signedIn" && !user) {
          return null; // Skip rendering if user is not signed in
        }

        return group.items ? (
          // Render grouped links
          <div key={groupIndex} className="flex flex-col gap-1.5">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(group.heading)}
            >
              <h3 className="text-md font-semibold text-gray-800 mt-2">
                {group.heading}
              </h3>
              <div className="text-gray-600">
                {collapsedSections[group.heading] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>

            <Collapse in={!collapsedSections[group.heading]}>
              <div className="flex flex-col gap-1.5">
                {group.items.map((route, index) => {
                  // Check if the individual route should be rendered based on the auth status
                  if (route.auth === "signedIn" && !user) {
                    return null; // Skip rendering if user is not signed in
                  }
                  return (
                    <NavLink
                      key={index}
                      to={route.link}
                      className={({ isActive }) =>
                        `flex gap-3 px-3 py-2 hover:bg-primary hover:bg-opacity-30 rounded font-medium items-center ${
                          isActive
                            ? "text-blue-900 bg-primary bg-opacity-20"
                            : "text-gray-600"
                        } text-base`
                      }
                      onClick={toggleMobile}
                    >
                      <div>{route.icon}</div>
                      <div>{route.text}</div>
                    </NavLink>
                  );
                })}
              </div>
            </Collapse>
          </div>
        ) : (
          // Render top-level link
          <NavLink
            key={groupIndex}
            to={group.link}
            className={({ isActive }) =>
              `flex gap-3 px-3 py-2 hover:bg-primary hover:bg-opacity-30 rounded font-medium items-center ${
                isActive
                  ? "text-blue-900 bg-primary bg-opacity-20"
                  : "text-gray-600"
              } text-base`
            }
            onClick={toggleMobile}
          >
            <div>{group.icon}</div>
            <div>{group.text}</div>
          </NavLink>
        );
      })}
      <div className={`text-sm gap-2 mt-4 flex flex-col items-center`}>
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
  );
};

export default Sidebar;
