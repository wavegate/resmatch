import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import authService from "@/services/authService";

const EmailConfirmation = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      const query = new URLSearchParams(location.search);
      const token = query.get("token");

      if (token) {
        try {
          const responseMessage = await authService.confirmEmail(token);
          setMessage(responseMessage);
        } catch (error) {
          setMessage("Error confirming email. Please try again.");
        }
      } else {
        setMessage("Invalid confirmation link.");
      }
    };

    confirmEmail();
  }, [location]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>{message}</p>
    </div>
  );
};

export default EmailConfirmation;
