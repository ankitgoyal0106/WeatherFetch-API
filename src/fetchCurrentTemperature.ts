import { GeoCoord } from "./fetchGeoCoord.js";
import fetch from "../include/fetch.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}
// making an interface to get rid of lint warnings, the converted jsonArray will be of this type
export interface currTemp {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}
export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  // TODO
  const url = new URL("https://220.maxkuechen.com/currentTemperature/forecast");
  url.searchParams.append("latitude", coords.lat.toString());
  url.searchParams.append("longitude", coords.lon.toString());
  url.searchParams.append("hourly", "temperature_2m");
  url.searchParams.append("temperature_unit", "fahrenheit");

  return fetch(url)
    .then(response =>
      response.ok ? response.json() : Promise.reject(new Error(`Error in response: ${response.statusText}`))
    )
    .then((json: currTemp) => {
      return Array.isArray(json.hourly.time) &&
        json.hourly.time.length > 0 &&
        Array.isArray(json.hourly.temperature_2m) &&
        json.hourly.temperature_2m.length > 0
        ? Promise.resolve({
            time: json.hourly.time,
            temperature_2m: json.hourly.temperature_2m,
          })
        : Promise.reject(new Error("No data found."));
    });
}
