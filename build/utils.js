"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccess = exports.handleError = exports.HTTPError = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = (databaseUrl) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connecting to database...");
    const res = yield mongoose_1.default.connect(databaseUrl);
    console.log("Connected to database successfully");
});
exports.connectToDatabase = connectToDatabase;
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
const handleSuccess = (res, message, data) => {
    res.json({ message, data, success: true });
};
exports.handleSuccess = handleSuccess;
