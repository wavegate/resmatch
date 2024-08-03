import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schema"; // Import the schema
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/constants";
import apiClient from "@/apiClient";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

async function signupUser(data: SignupFormValues) {
  const response = await apiClient.post("/signup", data);

  if (response.status !== 201) {
    throw new Error("Signup failed");
  }

  return response.data;
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
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      // Perform any additional success handling here, such as redirecting the user
      localStorage.setItem("token", data.token);
      notifications.show({
        message: "Signup successful",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Signup error:", error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Sign up</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Email"
                placeholder="residency@match.com"
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
                {...field}
              />
            )}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
