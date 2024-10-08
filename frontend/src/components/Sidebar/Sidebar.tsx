import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, LoadingOverlay, Collapse, Menu, Avatar } from "@mantine/core";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for collapse/expand
import menuRoutes from "./menuRoutes";
import useUser from "@/hooks/useUser"; // Import the useUser hook
import "./sidebar.scss";
import { generateGravatarUrl } from "@/utils/utils";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiLogoutBoxRLine } from "react-icons/ri";

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
      {/* <div className={`flex gap-3 sm:hidden relative`}>
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
      </div> */}
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
                        `flex gap-3 px-2 py-2 hover:bg-primary hover:bg-opacity-20 rounded font-medium items-center sidebar-link ${
                          isActive
                            ? "text-blue-900 bg-[#D0EBFF] is-active"
                            : "text-gray-700"
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
              `flex gap-3 px-2 py-2 hover:bg-primary hover:bg-opacity-20 rounded font-medium items-center sidebar-link ${
                isActive
                  ? "text-blue-900 bg-[#D0EBFF] is-active"
                  : "text-gray-700"
              } text-base`
            }
            onClick={toggleMobile}
          >
            <div>{group.icon}</div>
            <div>{group.text}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
