import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import authService from "@/services/authService";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      showNotification({
        title: "Success",
        message:
          "If your email is registered, you will receive a link to reset your password.",
        color: "green",
      });
      reset();
    },
    onError: (error) => {
      showNotification({
        title: "Error",
        message: "Failed to send reset link. Please try again later.",
        color: "red",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | {APP_NAME}</title>
      </Helmet>
      <Container size={420} my={40}>
        <Title align="center">Forgot Password</Title>
        <Text c="dimmed" size="sm" align="center" mt={5}>
          Enter your email address below to receive a password reset link.
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email"
              placeholder="Your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
              required
            />

            <Group position="right" mt="md">
              <Button type="submit" loading={mutation.isPending}>
                Send Reset Link
              </Button>
            </Group>

            <Group position="center" mt="lg">
              <Text size="sm">
                Remember your password?{" "}
                <Link to="/login" className={`text-blue-500 underline`}>
                  Login
                </Link>
              </Text>
            </Group>
          </form>
        </Paper>
      </Container>
    </>
  );
}
