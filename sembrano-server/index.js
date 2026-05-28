require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// Database Connection
connectDB();

app.use(express.json());

// Middleware
const allowedOrigins = new Set([
    process.env.CLIENT_ORIGIN,
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
]);

const corsOptions = {
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.has(origin) || /^https:\/\/.*\.vercel\.app$/i.test(origin)) {
            return callback(null, true);
        }

        return callback(null, true);
    },
    credentials: false,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/api/health", (req, res) => {
    res.status(200).json({ ok: true, service: "sembrano-server" });
});

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;