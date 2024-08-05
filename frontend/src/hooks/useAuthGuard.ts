import { useNavigate } from "react-router-dom";
import useUser from "./useUser";
import { useEffect } from "react";

export default () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  return { user, isLoading };
};
