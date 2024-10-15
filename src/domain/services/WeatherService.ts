import { OpenWeatherMapApiClient } from '../../infrastructure/OpenWeatherMapApiClient';
import { Weather } from '../models/Weather';

export class WeatherService {

    private weatherApiClient: OpenWeatherMapApiClient

    constructor(weatherApiClient: OpenWeatherMapApiClient) {
        this.weatherApiClient = weatherApiClient
    }

    public async getWeatherByLocation(lat: number, lon: number): Promise<Weather> {
       

        return this.weatherApiClient.getWeather(lat, lon)
    }
}
