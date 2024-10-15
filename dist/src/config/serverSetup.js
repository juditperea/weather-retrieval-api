"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var WeatherController_1 = __importDefault(require("../interface/controllers/WeatherController"));
var WeatherService_1 = require("../domain/services/WeatherService");
var OpenWeatherMapApiClient_1 = require("../infrastructure/OpenWeatherMapApiClient");
var app = (0, express_1.default)();
var port = 3000;
var apiKey = process.env.OPENWEATHERMAP_API_KEY || '';
var weatherApiClient = new OpenWeatherMapApiClient_1.OpenWeatherMapApiClient(apiKey);
var weatherService = new WeatherService_1.WeatherService(weatherApiClient);
var weatherController = new WeatherController_1.default(weatherService);
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Welcome to the Weather API! Use the /api/weather endpoint with query parameters "lat" and "lon" to retrieve current weather data for any location.');
});
app.get('/api/weather', function (req, res) { return weatherController.getWeather(req, res); });
app.listen(port, function () {
    console.log("Weather API server on port ".concat(port));
});
