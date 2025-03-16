"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    console.log(`A ${req.method} request to ${req.originalUrl} at ${new Date().toLocaleString()}`);
    next();
};
exports.requestLogger = requestLogger;
