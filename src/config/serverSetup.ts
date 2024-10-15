import express from 'express';
import WeatherController from '../interface/controllers/WeatherController';
import { WeatherService } from '../domain/services/WeatherService'; 
import { OpenWeatherMapApiClient } from '../infrastructure/OpenWeatherMapApiClient';

const app = express()
const port = 3000
const apiKey = process.env.OPENWEATHERMAP_API_KEY || '';

const weatherApiClient = new OpenWeatherMapApiClient(apiKey)
const weatherService = new WeatherService(weatherApiClient)
const weatherController = new WeatherController(weatherService)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the Weather API! Use the /api/weather endpoint with query parameters "lat" and "lon" to retrieve current weather data for any location.')
})

app.get('/api/weather', (req, res) => weatherController.getWeather(req, res))

app.listen(port, () => {
    console.log(`Weather API server on port ${port}`)
})
