# WeatherFetch-API

This project focuses on building an application that aggregates weather data for universities by interacting with various third-party APIs. The application emphasizes asynchronous programming and API handling.

## Project Overview

This project aims to:

- Query third-party web APIs to fetch data about universities, their geographic coordinates, and weather information.

- Process and combine this data into meaningful insights.

- Implement and test these features collaboratively as a team.

## Learning Objectives

- Use TypeScript to implement asynchronous API calls.

- Chain and create Promise objects.

- Leverage URL and URLSearchParams to construct and process URLs.

- Write comprehensive unit tests, including mock testing.


## Features

### Core Functionality

Fetching Geo Coordinates:

- Retrieve latitude and longitude for a university using a search query.

  - Endpoint: https://220.maxkuechen.com/geoCoord/search?q=query

Fetching Weather Data:

- Get temperature data based on geographic coordinates.

  - Endpoint: https://220.maxkuechen.com/currentTemperature/forecast

University Information:

- Search for universities and fetch a list of names matching a query.

  - Endpoint: https://220.maxkuechen.com/universities/search?name=name_query

Aggregated Weather Data for Universities:

- Compute average temperatures for multiple universities.

Additional Functionalities

- Error Handling: Ensures that invalid API responses are handled gracefully.

- Mock Testing: Provides controlled test scenarios for dynamic API behavior.
