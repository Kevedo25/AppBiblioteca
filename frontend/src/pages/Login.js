import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // Para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    setMsg(res.message);

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard"); // Redirige al dashboard
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
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
          Entrar
        </Button>
        <Typography color="error" sx={{ mt: 2 }}>
          {msg}
        </Typography>
      </Box>
    </Container>
  );
}
