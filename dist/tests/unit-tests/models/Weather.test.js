"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Weather_1 = require("../../../src/domain/models/Weather");
describe('Weather Model', function () {
    it('should create a Weather object with the fetched properties', function () {
        var weather = new Weather_1.Weather('Clouds', 'few clouds', 20.82, 20.65, 19.0, 22.67, 65);
        expect(weather.main).toBe('Clouds');
        expect(weather.description).toBe('few clouds');
        expect(weather.temperature).toBe(20.82);
        expect(weather.feels_like).toBe(20.65);
        expect(weather.temp_min).toBe(19.0);
        expect(weather.temp_max).toBe(22.67);
        expect(weather.humidity).toBe(65);
    });
});
