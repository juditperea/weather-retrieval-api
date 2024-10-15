"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
var Weather = /** @class */ (function () {
    function Weather(main, description, temperature, feels_like, temp_min, temp_max, humidity) {
        this.main = main;
        this.description = description;
        this.temperature = temperature;
        this.feels_like = feels_like;
        this.temp_min = temp_min;
        this.temp_max = temp_max;
        this.humidity = humidity;
    }
    return Weather;
}());
exports.Weather = Weather;
