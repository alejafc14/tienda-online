require("dotenv").config(); // Cargar variables de entorno

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express(); // Inicializar Express

// Middlewares
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(cors()); // Habilita CORS para el frontend
app.use(cookieParser()); // Permite leer cookies

// Configurar archivos estáticos correctamente
app.use(express.static(path.join(__dirname, "../frontend")));

// Importar rutas
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "No autorizado, inicia sesión" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

// Rutas públicas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "login.html"));
});

// Rutas protegidas
app.get("/index", authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.get("/catalogo", authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "catalogo.html"));
});

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
