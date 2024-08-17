import {
  Container,
  Paper,
  Title,
  Text,
  PasswordInput,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import authService from "@/services/authService";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      authService.updatePassword({ token, password }),
    onSuccess: () => {
      showNotification({
        title: "Success",
        message:
          "Password reset successfully. You can now log in with your new password.",
        color: "green",
      });
      navigate("/login");
    },
    onError: (error: any) => {
      showNotification({
        title: "Error",
        message: "Failed to reset password. Please try again later.",
        color: "red",
      });
    },
  });

  const onSubmit = handleSubmit(({ password }) => {
    mutation.mutate({ password });
  });

  return (
    <Container size={420} my={40}>
      <Title align="center">Reset Password</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Enter your new password below.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={errors.password?.message}
            required
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
            required
            mt="md"
          />
          <Group position="right" mt="md">
            <Button type="submit" loading={mutation.isLoading}>
              Reset Password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
