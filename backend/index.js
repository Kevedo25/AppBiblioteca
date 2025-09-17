import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { sequelize, Usuario, syncDB } from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "biblioteca123";

// 🔹 Sincronizar las tablas al iniciar el backend
syncDB();

// Conectar y sincronizar con la base de datos
sequelize.authenticate()
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.error("Error DB:", err));

// Sincronizar modelos
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Modelos sincronizados con la base de datos"))
  .catch(err => console.error("Error sincronizando modelos:", err));

// Registro
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await Usuario.findOne({ where: { username } });
    if (userExists) return res.status(400).json({ message: "Usuario ya existe" });

    const hashedPass = await bcrypt.hash(password, 10);
    await Usuario.create({ username, password: hashedPass });

    res.json({ message: "Registro exitoso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Login exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta protegida
app.get("/perfil", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: "Bienvenido al perfil", user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
});

app.listen(5000, () => console.log("Backend corriendo en http://localhost:5000"));
