import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "./schema";
import authService from "@/services/authService";
import { useEffect } from "react";

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
    defaultValues: {
      email: "cc.frankee@gmail.com",
      password: "testtest",
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      notifications.show({
        message: "Login successful",
        withBorder: true,
      });
      queryClient.resetQueries({ queryKey: ["currentUser"] });
      navigate("/");
    },
    onError: (error: any) => {
      notifications.show({
        message: "Login failed",
        color: "red",
        withBorder: true,
      });
      console.error("Login error:", error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
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
            {/* <Checkbox label="Remember me" /> */}
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={mutation.isPending}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
