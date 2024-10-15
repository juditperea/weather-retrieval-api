import axios from 'axios';
import { Weather } from '../domain/models/Weather';
import { config } from 'dotenv'; 

config()
export class OpenWeatherMapApiClient {

    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async getWeather(lat: number, lon: number): Promise<Weather> { 
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    lat,
                    lon,
                    appid: this.apiKey,
                    units: 'metric'
                }
            })

            const data = response.data

            const main = data.weather[0].main        
            const description = data.weather[0].description 
            const temperature = data.main.temp             
            const feels_like = data.main.feels_like         
            const temp_min = data.main.temp_min             
            const temp_max = data.main.temp_max             
            const humidity = data.main.humidity             

            return new Weather(main, description, temperature, feels_like, temp_min, temp_max, humidity)
        } catch (error: any) {
            throw new Error('API connection rejected: ' + error.message)
        }
    }
}
