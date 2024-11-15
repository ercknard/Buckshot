import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from "@mui/material";
import { User } from "@supabase/supabase-js";
import supabase from "@/lib/supabase"; // Ensure correct import path
import GenericTable from "@/components/layout/GenericData";
import { fetchTables } from "@/lib/fectTableSupabase";

interface Table {
  name: string;
}

const HomePage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  // Load tables after user is authenticated
  useEffect(() => {
    const loadTables = async () => {
      if (user) {
        // Check if the user exists in the "users" table
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) {
          // If the user doesn't exist in the users table, create the user entry
          const { error: insertError } = await supabase.from("users").insert([
            {
              email: user.email,
              role: "user", // Default role is user
            },
          ]);

          if (insertError) {
            setError("Error creating user record.");
            return;
          }
        }

        // Now fetch the tables only after the user is validated in the users table
        const fetchedTables = await fetchTables();
        setTables(fetchedTables);
      }
    };
    loadTables();
  }, [user]); // Only run this effect when the user changes

  // Handle login
  const handleLogin = async () => {
    setError(""); // Reset any previous errors
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setUser(data.user);
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear user data on logout
  };

  // If the user is not logged in, show login form
  if (!user) {
    return (
      <Container>
        <Box padding={5} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Login to Access Tables
          </Typography>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: "1rem" }}
          >
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  // If user is logged in, render the tables page
  return (
    <Box padding={5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          CryptechTest Tables
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          style={{ marginBottom: "1rem" }}
        >
          Logout
        </Button>
      </Stack>

      {/* Render the tables here */}
      {tables
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((table) => (
          <Box
            key={table.name}
            marginTop={"2.5rem"}
            marginBottom={"2.5rem"}
            padding={10}
            bgcolor={"custom.primaryBackground"}
            borderRadius={3}
          >
            <GenericTable tableName={table.name} />
          </Box>
        ))}
    </Box>
  );
};

export default HomePage;
