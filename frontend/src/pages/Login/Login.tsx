import React from "react";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { loginSchema } from "./schema"; // Import the schema
import { API_URL } from "@/constants";
import apiClient from "@/apiClient";

interface LoginFormValues {
  email: string;
  password: string;
}

async function loginUser(data: LoginFormValues) {
  const response = await apiClient.post(`/login`, data);

  if (response.status !== 200) {
    throw new Error("Login failed");
  }

  return response.data;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      // Perform any additional success handling here, such as redirecting the user
    },
    onError: (error: any) => {
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
        <Anchor size="sm" component="button">
          Sign up
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                error={errors.email?.message}
                required
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
                {...field}
              />
            )}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={mutation.isLoading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
