import { Weather } from '../domain/models/Weather'; 
import { WeatherService } from '../domain/services/WeatherService'; 

export class GetWeatherByCityUseCase {
    
    private weatherService: WeatherService

    constructor(weatherService: WeatherService) { 
        this.weatherService = weatherService
    }

    async execute(lat: number, lon: number): Promise<Weather> {
        return await this.weatherService.getWeatherByLocation(lat, lon)
    }
}
