import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle form submission for sign-up
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // Send the sign-up request to the backend
      const response = await fetch("/api/signup", {
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
        setSuccessMessage("User successfully created!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setError("An error occurred during sign-up");
    }
  };

  return (
    <Container>
      <Box padding={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Create an Account
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

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <Typography color="error">{error}</Typography>}
        {successMessage && (
          <Typography color="primary">{successMessage}</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignUp}
          style={{ marginTop: "1rem" }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpPage;
