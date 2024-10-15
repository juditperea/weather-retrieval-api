import { OpenWeatherMapApiClient } from '../../../src/infrastructure/OpenWeatherMapApiClient';
import { Weather } from '../../../src/domain/models/Weather';
import { config } from 'dotenv'; 

config()
describe('OpenWeatherMapApiClient Integration Tests', () => {
    let apiClient: OpenWeatherMapApiClient

    beforeAll(() => {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY; 

        apiClient = new OpenWeatherMapApiClient(apiKey)
    })

    it('should fetch weather data successfully if lat and lon are not invalid', async () => {
        const lat = 41.4
        const lon = 2.17

        const weatherData = await apiClient.getWeather(lat, lon)

        expect(weatherData).toBeInstanceOf(Weather)
        expect(weatherData.main).toBeDefined()
        expect(weatherData.description).toBeDefined()
        expect(weatherData.temperature).toBeDefined()
    })

    it('should handle errors when the API connection fails', async () => {
        
        const invalidLat = 99
        const invalidLon = 99

        await expect(apiClient.getWeather(invalidLat, invalidLon)).rejects.toThrow('API connection rejected')
    })
})
