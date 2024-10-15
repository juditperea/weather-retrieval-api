"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Welcome to the Weather API! Use the /api/weather endpoint with query parameters "lat" and "lon" to retrieve current weather data for any location.');
});
exports.default = app;
