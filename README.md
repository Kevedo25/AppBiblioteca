# Proyecto Biblioteca

## Integrantes del equipo
- Kevin Edwin Gonzalez Lira – matrícula: 1750417  


## Descripción del proyecto
Esta es una aplicación web para la gestión de una biblioteca. Permite registrar usuarios, iniciar sesión, y eventualmente administrar libros, préstamos y reportes.  

El proyecto está dividido en **Front End** y **Back End**:

- **Front End:** desarrollado con React y MaterialUI. Solo se comunica con el Back End mediante JSON y consume los endpoints para login, registro y futuras funcionalidades.
- **Back End:** desarrollado con Node.js y Express, conectado a una base de datos MySQL mediante Sequelize (ORM). Se encarga de manejar la lógica, autenticación y persistencia de datos.

## Estructura del proyecto
El proyecto cuenta con 2 carpetas, una frontend y otra backend.
En el backend contendra el index.js y db.js, el index.js contendra los metodos POST de Login y Register, asi como una ruta protegida.
Login y Register se conectaran a la base de datos y en el caso de Login, buscara el nombre del usuario y comprobara la contraseña, con Register se usara Sequelize para instertar un registro de nuevo usuario.
El arhcivo db.js hace la conexión a la base de datos, aqui es donde puedes cambiar el usuario, constraseña, nombre de la base de datos y host para conectar el backend a una base de datos del sistema(En este caso se uso MySQL).


## Funcionalidades implementadas
- Registro de usuarios con validación para no duplicados.
- Inicio de sesión con autenticación JWT.
- Almacenamiento seguro de contraseñas usando bcrypt.
- Comunicación del Front End con el Back End mediante JSON.
- Dashboard básico para usuarios autenticados.

## Cómo ejecutar el proyecto

### Backend
1. Abrir terminal en la carpeta `backend`.
2. Instalar dependencias con el siguiente bash:
npm install
3. Ejecutar el servidor con:
node index.js

#El backend estara disponible en: http://localhost:5000

### Frontend
1. Abrir terminal en la carpeta `frontend`.
2. Instalar dependencias con el siguiente bash:
npm install
3. Ejecutar la aplicación con:
npm start

El frontend abrira automaticamente en: http://localhost:3000

## Base de datos

Base de datos: MySQL

Nombre de la BD: Biblioteca

### Query para creacion de BD(Diseño de la base de datos):
---------------------------------------------------------------------------------
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS Biblioteca;
USE Biblioteca;

-- Tabla Roles
CREATE TABLE Roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

-- Tabla Usuarios
CREATE TABLE Usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES Roles(id)
);

-- Tabla Categorias
CREATE TABLE Categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

-- Tabla Autores
CREATE TABLE Autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Tabla Libros
CREATE TABLE Libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  autor_id INT,
  categoria_id INT,
  disponible BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (autor_id) REFERENCES Autores(id),
  FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
);

-- Tabla Prestamos
CREATE TABLE Prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  libro_id INT,
  fecha_prestamo DATE,
  fecha_devolucion DATE,
  devuelto BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
  FOREIGN KEY (libro_id) REFERENCES Libros(id)
);

-- Insertar roles por defecto
INSERT INTO Roles (nombre) VALUES ('Admin'), ('Usuario');

----------------------------------------------------------------------------------

ORM: Sequelize

## Nota

-El frontend no accede directamente a la base de datos; todas las operaciones se realizan a través del backend usando los metodos API POST, GET, etc. desde el frontend.

