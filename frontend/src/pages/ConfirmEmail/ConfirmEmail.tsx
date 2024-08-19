import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { notifications } from "@mantine/notifications";

const EmailConfirmation = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const query = new URLSearchParams(location.search);
      const token = query.get("token");

      if (token) {
        try {
          const responseMessage = await authService.confirmEmail(token);
          setMessage(responseMessage);
          notifications.show({
            message: "Email confirmed! You may now log in.",
            withBorder: true,
            color: "green",
          });
          navigate("/login");
        } catch (error) {
          setMessage("Error confirming email. Please try again.");
        }
      } else {
        setMessage("Invalid confirmation link.");
      }
    };

    confirmEmail();
  }, []);

  return (
    <div className={`flex flex-col gap-2`}>
      <h1 className={`font-bold text-xl`}>Email Confirmation</h1>
      <p>{message}</p>
      <Link to="/login" className={`text-blue-500 underline`}>
        Click here to return to log in page
      </Link>
    </div>
  );
};

export default EmailConfirmation;
