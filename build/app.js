"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const db_1 = require("./utils/db");
const request_logger_middleware_1 = require("./middleware/request-logger.middleware");
// Get environmental variables
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL || "";
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(request_logger_middleware_1.requestLogger);
// Routes
app.use("/api", index_route_1.default);
// Connect to database and then, start the server
(0, db_1.connectToDatabase)(DATABASE_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`Note API listening at port ${PORT}`));
})
    .catch((error) => console.log("Error connecting to database", error));
