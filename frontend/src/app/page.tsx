"use client";

import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  TextInput,
  Accordion,
  MultiSelect,
  Title,
  Card,
  Text,
  Stack,
} from "@mantine/core";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

interface Task {
  id: string;
  name: string;
  description: string;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [tasksResponse, routinesResponse] = await Promise.all([
          axios.get<Task[]>("http://localhost:8000/tasks/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<Routine[]>("http://localhost:8000/routines", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTasks(tasksResponse.data);
        setRoutines(routinesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post<Task>(
        "http://localhost:8000/tasks",
        {
          name: taskName,
          description: taskDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks((prev) => [...prev, response.data]);
      setTaskName("");
      setTaskDescription("");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleCreateRoutine = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/routines",
        {
          name: routineName,
          description: routineDescription,
          tasks: selectedTasks,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRoutineName("");
      setRoutineDescription("");
      setSelectedTasks([]);
      // refresh routines
      const routinesResponse = await axios.get<Routine[]>("http://localhost:8000/routines", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoutines(routinesResponse.data);
    } catch (error) {
      console.error("Failed to create routine:", error);
    }
  };

  return (
    <ProtectedRoute>
      <Container size="md" py="md">
        <Title order={2} ta="center" mb="md">
          Welcome!
        </Title>
        <Button color="red" variant="outline" onClick={logout} mb="xl">
          Logout
        </Button>

        <Accordion variant="separated" multiple defaultValue={["task", "routine"]}>
          <Accordion.Item value="task">
            <Accordion.Control>Create Task</Accordion.Control>
            <Accordion.Panel>
              <form onSubmit={handleCreateTask}>
                <Stack>
                  <TextInput
                    label="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                  />
                  <TextInput
                    label="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                  />
                  <Button type="submit">Create Task</Button>
                </Stack>
              </form>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="routine">
            <Accordion.Control>Create Routine</Accordion.Control>
            <Accordion.Panel>
              <form onSubmit={handleCreateRoutine}>
                <Stack>
                  <TextInput
                    label="Routine Name"
                    value={routineName}
                    onChange={(e) => setRoutineName(e.target.value)}
                    required
                  />
                  <TextInput
                    label="Routine Description"
                    value={routineDescription}
                    onChange={(e) => setRoutineDescription(e.target.value)}
                    required
                  />
                  <MultiSelect
                    label="Select Tasks"
                    data={tasks.map((task) => ({
                      value: String(task.id),
                      label: task.name,
                    }))}
                    value={selectedTasks}
                    onChange={setSelectedTasks}
                    searchable
                  />
                  <Button type="submit">Create Routine</Button>
                </Stack>
              </form>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Title order={3} mt="xl" mb="sm">
          Your routines:
        </Title>
        <Stack>
          {routines.map((routine) => (
            <Card key={routine.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4}>{routine.name}</Title>
              <Text size="sm" c="dimmed">
                {routine.description}
              </Text>
              <ul>
                {routine.tasks?.map((task) => (
                  <li key={task.id}>
                    <strong>{task.name}</strong>: {task.description}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Stack>
      </Container>
    </ProtectedRoute>
  );
};

export default Home;
