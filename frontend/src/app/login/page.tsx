"use client";

import { useContext, useState, FormEvent } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Stack,
  Divider,
  Space,
} from "@mantine/core";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth", {
        username: registerUsername,
        password: registerPassword,
      });
      login(registerUsername, registerPassword);
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <Container size="xs" mt="xl">
      <Title order={2} ta="center">
        Login
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack mt="md">
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <Button type="submit" fullWidth>
            Login
          </Button>
        </Stack>
      </form>

      <Divider my="xl" label="or" labelPosition="center" />

      <Title order={2} ta="center">
        Register
      </Title>
      <form onSubmit={handleRegister}>
        <Stack mt="md">
          <TextInput
            label="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.currentTarget.value)}
            required
          />
          <Button type="submit" color="teal" fullWidth>
            Register
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
