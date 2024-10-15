import request from 'supertest';
import express from 'express';
import WeatherController from '../../../src/interface/controllers/WeatherController';
import { WeatherService } from '../../../src/domain/services/WeatherService';
import { Weather } from '../../../src/domain/models/Weather';

jest.mock('../../../src/domain/services/WeatherService') 

describe('WeatherController', () => {
    let app: express.Application
    let weatherService: jest.Mocked<WeatherService> 
    let weatherController: WeatherController

    beforeEach(() => {
        app = express(); 
        weatherService = new (WeatherService as jest.Mock)()
        weatherController = new WeatherController(weatherService)

        app.get('/api/weather', (req, res) => weatherController.getWeather(req, res))
    })

    it('should return 200 and call weather service for valid lat and lon', async () => {
        const mockWeather = new Weather('Clouds', 'few clouds', 20.82, 20.65, 19.0, 22.67, 65)
        
        weatherService.getWeatherByLocation.mockResolvedValue(mockWeather)
    
        const response = await request(app).get('/api/weather?lat=41.4&lon=2.17')
    
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockWeather)
        expect(weatherService.getWeatherByLocation).toHaveBeenCalledWith(41.4, 2.17)
    })

    it('should return 500 if there is an error fetching weather data', async () => {
      
        weatherService.getWeatherByLocation.mockRejectedValue(new Error('API connection rejected'))

        const response = await request(app).get('/api/weather?lat=41.4&lon=2.17')

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'API connection rejected'})
    })

    it('should return an error message if lat is missing', async () => {
        const response = await request(app).get('/api/weather?lon=2.17');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
    });

    it('should return an error message if lon is missing', async () => {
        const response = await request(app).get('/api/weather?lat=41.4');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
    });

    it('should return an error message if lat is not a number', async () => {
        const response = await request(app).get('/api/weather?lat=notANumber&lon=2.17');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
    });

    it('should return an error message if lon is not a number', async () => {
        const response = await request(app).get('/api/weather?lat=41.4&lon=notANumber');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Invalid parameters: lat and lon must be valid numbers.' });
    });
})
