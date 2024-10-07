import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "./schema";
import authService from "@/services/authService";
import useUser from "@/hooks/useUser";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import { SiDiscord, SiReddit } from "react-icons/si";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { refetch } = useUser();

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      notifications.show({
        message: "Login successful",
        withBorder: true,
        color: "green",
      });
      refetch();
      navigate("/");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };
  const handleRedditLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/reddit`;
  };
  const handleDiscordLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/discord`;
  };

  return (
    <>
      <Helmet>
        <title>Login | {APP_NAME}</title>
      </Helmet>
      <Container size={420} my={40}>
        <Title ta="center">Login</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Link to="/sign-up">
            <Anchor size="sm" component="button">
              Sign up
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmit}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  required
                  size="md"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  required
                  mt="md"
                  size="md"
                  {...field}
                />
              )}
            />
            <Group justify="space-between" mt="lg">
              <Anchor component={Link} to="/forgot-password" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button
              fullWidth
              mt="xl"
              type="submit"
              loading={mutation.isPending}
            >
              Sign in
            </Button>
          </form>

          <Divider label="Or continue with" labelPosition="center" my="lg" />

          <div className={`flex flex-col gap-2`}>
            <Button
              fullWidth
              variant="default"
              onClick={handleGoogleLogin}
              leftSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="18px"
                  height="18px"
                >
                  <path
                    fill="#4285F4"
                    d="M46.94 24.5c0-1.49-.12-2.9-.34-4.29H24v8.14h12.96c-.56 2.86-2.2 5.27-4.68 6.9v5.75h7.56c4.42-4.07 6.98-10.07 6.98-16.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.3 0 11.58-2.1 15.43-5.7l-7.56-5.75c-2.1 1.42-4.77 2.27-7.87 2.27-6.05 0-11.17-4.08-13-9.63H3.27v6.06C7.08 42.13 14.94 48 24 48z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M11 29.15c-.97-2.86-.97-5.94 0-8.8v-6.05H3.27C.69 18.06 0 21.04 0 24s.69 5.94 3.27 8.8L11 29.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 9.45c3.07 0 5.83 1.06 8.01 2.98l6.01-6.01C35.57 2.1 30.29 0 24 0 14.94 0 7.08 5.87 3.27 14.2l7.73 6.06C12.83 13.53 17.95 9.45 24 9.45z"
                  />
                </svg>
              }
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="default"
              onClick={handleRedditLogin}
              leftSection={<SiReddit size={18} color="#FF4500" />}
            >
              Sign in with Reddit
            </Button>
            <Button
              fullWidth
              variant="default"
              onClick={handleDiscordLogin} // Add a handler for Discord login
              leftSection={<SiDiscord size={18} color="#5865F2" />} // Use the Discord icon
            >
              Sign in with Discord
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
}
