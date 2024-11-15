import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from "@mui/material";
import GenericTable from "@/components/layout/GenericData";
import { fetchTables } from "@/lib/fectTableSupabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Table {
  name: string;
}

const AdminPage: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(null); // Custom user object
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  // Load user session from localStorage when the page is refreshed
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user from localStorage if it exists
    }
  }, []);

  // Load tables after user is authenticated
  useEffect(() => {
    const loadTables = async () => {
      if (user) {
        // Fetch the tables after user is authenticated
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
        const userData = { email: data.user.email }; // Extract user data from response
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  // If the user is not logged in, show login form
  if (!user) {
    return (
      <Box bgcolor={"custom.primaryBackground"}>
        <Navbar />
        <Container>
          <Box padding={5} textAlign="center" minHeight={"74vh"}>
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
        <Footer />
      </Box>
    );
  }

  // If user is logged in, render the tables page
  return (
    <Box bgcolor={"custom.primaryBackground"}>
      <Navbar />
      <Box padding={5} paddingTop={0}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" color="custom.primaryText">
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
              bgcolor={"custom.secondaryBackground"}
              borderRadius={3}
            >
              <GenericTable tableName={table.name} />
            </Box>
          ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminPage;
