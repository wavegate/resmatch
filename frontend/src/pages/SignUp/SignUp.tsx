import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Divider,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/authService";

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values) => authService.register(values),
    onSuccess: (data) => {
      notifications.show({
        message:
          "User registered successfully. Please check your email to confirm your registration.",
        withBorder: true,
        color: "green",
      });

      // queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Signup error:", error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // Function to redirect to Google OAuth
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Sign up</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Link to="/login">
          <Anchor size="sm" component="button">
            Login
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Email"
                placeholder="Your email"
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
                placeholder="Your password"
                error={errors.password?.message}
                required
                mt="md"
                size="md"
                {...field}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                required
                mt="md"
                size="md"
                {...field}
              />
            )}
          />
          <Button fullWidth mt="xl" type="submit" loading={mutation.isPending}>
            Sign up
          </Button>
        </form>

        <Divider label="Or sign up with" labelPosition="center" my="lg" />

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
          Sign up with Google
        </Button>
      </Paper>
    </Container>
  );
}
