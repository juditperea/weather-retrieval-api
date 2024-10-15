import { WeatherService } from '../../../src/domain/services/WeatherService';
import { OpenWeatherMapApiClient } from '../../../src/infrastructure/OpenWeatherMapApiClient';
import { Weather } from '../../../src/domain/models/Weather';

jest.mock('../../../src/infrastructure/OpenWeatherMapApiClient')

describe('WeatherService', () => {
    let weatherApiClient: jest.Mocked<OpenWeatherMapApiClient>
    let weatherService: WeatherService

    beforeEach(() => {
        weatherApiClient = new OpenWeatherMapApiClient('mockData') as jest.Mocked<OpenWeatherMapApiClient>
        weatherService = new WeatherService(weatherApiClient)
    })

    it('should return weather data for a given location', async () => {
        const mockWeather = new Weather(
            'Clouds',
            'few clouds',
            20.82,             
            20.65,             
            19.0,            
            22.67,             
            65 
        )

        weatherApiClient.getWeather = jest.fn().mockResolvedValue(mockWeather)

        const lat = 41.4
        const lon = 2.17

        const weatherData = await weatherService.getWeatherByLocation(lat, lon)

        expect(weatherApiClient.getWeather).toHaveBeenCalledWith(lat, lon)

        expect(weatherData).toEqual(mockWeather)
    })

    it('should throw errors when fetching weather data fails', async () => {

        weatherApiClient.getWeather = jest.fn().mockRejectedValue(new Error('API connection rejected'))

        const lat = 414142
        const lon = 17414

        await expect(weatherService.getWeatherByLocation(lat, lon)).rejects.toThrow('API connection rejected')
    })
})
