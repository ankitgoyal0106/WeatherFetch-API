import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchUniversities } from "./fetchUniversities.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversities(universityQuery).then(universities => {
    if (universities.length === 0) {
      return Promise.reject(new Error("No results found for query."));
    }

    const temperaturePromises = universities.map(university => {
      const checkName = transformName ? transformName(university) : university;
      return fetchGeoCoord(checkName)
        .then(fetchCurrentTemperature)
        .then(data => {
          const avg = data.temperature_2m.reduce((acc, ele) => acc + ele, 0) / data.temperature_2m.length;
          return { name: university, avg };
        });
    });
    return Promise.all(temperaturePromises).then(results => {
      const x: AverageTemperatureResults = { totalAverage: NaN };
      let total = 0;

      results.forEach(ele => {
        x[ele.name] = ele.avg;
        total += ele.avg;
      });

      x.totalAverage = total / results.length;
      return x;
    });
  });
}
function transform(s: string): string {
  return s.replace(" at ", " ");
}
export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of Massachusetts", transform);
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of California");
}
