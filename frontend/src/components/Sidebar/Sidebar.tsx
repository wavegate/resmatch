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

const Sidebar = ({ toggle, isLoading, user, signOut }) => {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (section) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex gap-3 px-3 py-2 hover:bg-primary hover:bg-opacity-30 rounded font-medium items-center ${
            isActive
              ? "text-blue-900 bg-primary bg-opacity-20"
              : "text-gray-600"
          } text-base`
        }
        onClick={toggle}
      >
        <div>
          <HiHome className="h-4 w-4" /> {/* Use the home icon */}
        </div>
        <div>Welcome</div>
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex gap-3 px-3 py-2 hover:bg-primary hover:bg-opacity-30 rounded font-medium items-center ${
            isActive
              ? "text-blue-900 bg-primary bg-opacity-20"
              : "text-gray-600"
          } text-base`
        }
        onClick={toggle}
      >
        <div>
          <HiOutlineViewGrid className="h-4 w-4" />{" "}
          {/* Use the dashboard icon */}
        </div>
        <div>Dashboard</div>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex gap-3 px-3 py-2 hover:bg-primary hover:bg-opacity-30 rounded font-medium items-center ${
            isActive
              ? "text-blue-900 bg-primary bg-opacity-20"
              : "text-gray-600"
          } text-base`
        }
        onClick={toggle}
      >
        <div>
          <HiOutlineUserCircle className="h-4 w-4" />{" "}
          {/* Use the profile icon */}
        </div>
        <div>Profile</div>
      </NavLink>
      <NavLink
        to="/main"
        className={({ isActive }) =>
          `flex gap-3 px-3 py-2 hover:bg-primary hover:bg-opacity-30 rounded font-medium items-center ${
            isActive
              ? "text-blue-900 bg-primary bg-opacity-20"
              : "text-gray-600"
          } text-base`
        }
        onClick={toggle}
      >
        <div>
          <HiOutlineChat className="h-4 w-4" />
        </div>
        <div>Main Chat</div>
      </NavLink>

      {menuRoutes.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-1.5">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(group.heading)}
          >
            <h3 className="text-md font-semibold text-gray-800">
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
              {group.items.map((route, index) => (
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
                  onClick={toggle}
                >
                  <div>{route.icon}</div>
                  <div>{route.text}</div>
                </NavLink>
              ))}
            </div>
          </Collapse>
        </div>
      ))}

      <div className={`flex gap-3 sm:hidden relative`}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
          loaderProps={{ size: "sm" }}
        />
        {!user && (
          <>
            <Link to="/login" onClick={toggle}>
              <Button variant="default" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/sign-up" onClick={toggle}>
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
    </div>
  );
};

export default Sidebar;
