import express from 'express';
import { Request, Response } from 'express';

const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Weather API! Use the /api/weather endpoint with query parameters "lat" and "lon" to retrieve current weather data for any location.')
})

export default app
