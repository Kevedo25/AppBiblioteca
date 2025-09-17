import React from "react";
import { Container, Typography, Box, Card, CardContent, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          Dashboard Biblioteca
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Administra libros, usuarios y préstamos de manera sencilla.
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Libros */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Libros
              </Typography>
              <Typography variant="body2">
                Agrega, edita y elimina libros disponibles en la biblioteca.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Usuarios */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Usuarios
              </Typography>
              <Typography variant="body2">
                Administra los usuarios registrados y sus permisos.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Préstamos */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Préstamos
              </Typography>
              <Typography variant="body2">
                Consulta y gestiona los préstamos de libros de los usuarios.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reportes */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Reportes
              </Typography>
              <Typography variant="body2">
                Genera reportes sobre libros, préstamos y actividad de usuarios.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
