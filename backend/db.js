import { Sequelize, DataTypes } from "sequelize";

// Conexión a MySQL
export const sequelize = new Sequelize("Biblioteca", "root", "257820Tamamo.", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log
});

// Probar conexión
sequelize.authenticate()
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.error("Error DB:", err));

// Modelo de Usuario
export const Usuario = sequelize.define("Usuario", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role_id: { type: DataTypes.INTEGER, defaultValue: 2 }
}, { tableName: "Usuarios", timestamps: false });

// 🔹 Sincronizar el modelo con la base de datos
export const syncDB = async () => {
  try {
    await sequelize.sync(); // para crear las tablas si no existen
    console.log("Tablas sincronizadas correctamente");
  } catch (err) {
    console.error("Error sincronizando tablas:", err);
  }
};
