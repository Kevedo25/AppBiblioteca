import React, { useState } from "react";
import { register } from "../services/api";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Register() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(username, password);
    setMsg(res.message);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
        </Typography>

        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrar
        </Button>

        <Typography color="error" sx={{ mt: 2 }}>
          {msg}
        </Typography>
      </Box>
    </Container>
  );
}
