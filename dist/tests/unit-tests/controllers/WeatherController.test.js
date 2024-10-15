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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var express_1 = __importDefault(require("express"));
var WeatherController_1 = __importDefault(require("../../../src/interface/controllers/WeatherController"));
var WeatherService_1 = require("../../../src/domain/services/WeatherService");
var Weather_1 = require("../../../src/domain/models/Weather");
jest.mock('../../../src/domain/services/WeatherService');
describe('WeatherController', function () {
    var app;
    var weatherService;
    var weatherController;
    beforeEach(function () {
        app = (0, express_1.default)();
        weatherService = new WeatherService_1.WeatherService();
        weatherController = new WeatherController_1.default(weatherService);
        app.get('/api/weather', function (req, res) { return weatherController.getWeather(req, res); });
    });
    it('should return 200 and call weather service for valid lat and lon', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockWeather, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockWeather = new Weather_1.Weather('Clouds', 'few clouds', 20.82, 20.65, 19.0, 22.67, 65);
                    weatherService.getWeatherByLocation.mockResolvedValue(mockWeather);
                    return [4 /*yield*/, (0, supertest_1.default)(app).get('/api/weather?lat=41.4&lon=2.17')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toEqual(mockWeather);
                    expect(weatherService.getWeatherByLocation).toHaveBeenCalledWith(41.4, 2.17);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 500 if there is an error fetching weather data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weatherService.getWeatherByLocation.mockRejectedValue(new Error('API connection rejected'));
                    return [4 /*yield*/, (0, supertest_1.default)(app).get('/api/weather?lat=41.4&lon=2.17')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(500);
                    expect(response.body).toEqual({ error: 'API connection rejected' });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error message if lat is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get('/api/weather?lon=2.17')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(500);
                    expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error message if lon is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get('/api/weather?lat=41.4')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(500);
                    expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error message if lat is not a number', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get('/api/weather?lat=notANumber&lon=2.17')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(500);
                    expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error message if lon is not a number', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get('/api/weather?lat=41.4&lon=notANumber')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(500);
                    expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
                    return [2 /*return*/];
            }
        });
    }); });
});
