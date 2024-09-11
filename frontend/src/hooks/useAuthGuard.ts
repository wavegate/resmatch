import { useNavigate } from "react-router-dom";
import useUser from "./useUser";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

interface UseAuthGuardProps {
  id?: number;
}

export default ({ id, guard = true }: UseAuthGuardProps = {}) => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (guard && !isLoading) {
      if (!user) {
        navigate("/login", { replace: true });
      } else if (id && user.id !== id) {
        notifications.show({
          title: "Permission Denied",
          message: "You do not have permission to access this resource.",
          color: "red",
        });
        navigate("/");
      }
    }
  }, [user, isLoading, id, navigate, guard]);

  return { user, isLoading };
};
