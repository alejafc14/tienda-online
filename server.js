require("dotenv").config(); // Cargar variables de entorno

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ⚠️ Definir antes de usar

// Middlewares
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(cors()); // Habilita CORS para el frontend

// Importar rutas
const authRoutes = require("./routes/auth"); // Importar después de definir `app`
app.use("/api/auth", authRoutes); // Ahora `app` ya está definido
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

// Lista de productos en el backend
const productos = [
  { id: 1, nombre: "Laptop", precio: 1500, imagen: "img/laptop.png" },
  { id: 2, nombre: "Mouse Gamer", precio: 350, imagen: "img/mouse.png" },
  { id: 3, nombre: "Teclado Mecánico RGB", precio: 1200, imagen: "img/TecladoMecanicoRGB-1.png" },
  { id: 4, nombre: "Monitor 24'' Full HD", precio: 1800, imagen: "img/monitor.png" },
  { id: 5, nombre: "Audífonos Bluetooth", precio: 1800, imagen: "img/AudifonosInalambricosBluetooth.png" },
  { id: 6, nombre: "Silla Gamer Ergonómica", precio: 2500, imagen: "img/sillagamerergonomica.png" },
  { id: 7, nombre: "Tarjeta Gráfica RTX 3060", precio: 6000, imagen: "img/tarjetagraficartx3060.png" }
];

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

