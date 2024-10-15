import { Request, Response } from 'express'; 
import { WeatherService } from '../../domain/services/WeatherService'; 
import { GetWeatherByCityUseCase } from '../../application/GetWeatherByCityUseCase'; 

class WeatherController {
    private weatherService: WeatherService

    constructor(weatherService: WeatherService) { 
        this.weatherService = weatherService
    }

    async getWeather(req: Request, res: Response): Promise<void> { 
        const lat = parseFloat(req.query.lat as string)
        const lon = parseFloat(req.query.lon as string)

        if (!this.validateParameters(lat, lon)) {
            res.status(500).json({ error: 'Invalid parameters: lat and lon must be valid numbers.' })
            return;
        }

        const useCase = new GetWeatherByCityUseCase(this.weatherService)

        try {
            const weather = await useCase.execute(lat, lon)
            res.status(200).json(weather)
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
            res.status(500).json({ error: errorMessage })
        }
    }

    private validateParameters(lat: number, lon: number): boolean {
        return !isNaN(lat) && !isNaN(lon)
    }
}

export default WeatherController
