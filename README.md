# weather-retrieval-api

Weather retrieval application built using Node.js, Express.js, and TypeScript. The application is designed following Domain-Driven Design (DDD) and Clean Architecture principles. It fetches the current weather data for any given location using the OpenWeatherMap API.

## Requirements

Before cloning the repository, please make sure **Node.js** and **npm** are installed on your system.

## Installation Instructions

1. **Clone this repository:**

   ```bash
   git clone https://github.com/juditperea/weather-retrieval-api

   cd weather-retrieval-api
   ```
Install dependencies:

```bash
npm install
```
This command will install all the necessary dependencies listed in the package.json file.

## Build the Project
To compile the TypeScript code and generate the environment output in the dist directory, run:

```bash
npm run build
```
This step is essential because TypeScript needs to be compiled to JavaScript before the application can run.


## Run the Application

To start the application in the production environment, using the output from the dist directory, use:

```bash
npm start
```


## Environment Configuration

Note: The OpenWeatherMap API key is directly included in the code for the purpose of simplifying this technical evaluation. I am aware that embedding sensitive information directly in code is not a best practice. In a real-world production environment, sensitive data such as API keys should be stored securely, typically in an environment file like .env, which is then referenced within the codebase.


## API Endpoints

1. Get Weather Data

Endpoint:
```bash
 GET /api/weather
```

Query Parameters:

* lat: Latitude of the location (e.g., 41.4)

* lon: Longitude of the location (e.g., 2.17)

Example Request:

```bash
GET /api/weather?lat=41.4&lon=2.17
```
Responses:

* 200 OK: Returns a JSON object containing the current weather data.

Example Response:

```json
{
  "main": "Clouds",
  "description": "few clouds",
  "temperature": 19.3,
  "feels_like": 18.96,
  "temp_min": 19.3,
  "temp_max": 19.3,
  "humidity": 64
}
```

* 500 Internal Server Error: If there is an issue retrieving the weather data.

Example Response:

```json
{
    "error": "Error fetching weather data: <error_message>"
}
```
