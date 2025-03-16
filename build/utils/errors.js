"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.HTTPError = HTTPError;
const handleError = (res, error, defaultError) => {
    const errorCode = error instanceof HTTPError ? error.code : 500;
    const message = error instanceof Error ? error.message : defaultError;
    res.status(errorCode).json({
        message,
        success: false,
    });
};
exports.handleError = handleError;
