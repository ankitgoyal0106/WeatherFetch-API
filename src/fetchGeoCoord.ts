import fetch from "../include/fetch.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}
// making an interface to get rid of lint warnings, the converted jsonArray will be of this type
export interface Geo {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const url = new URL("https://220.maxkuechen.com/geoCoord/search");
  url.searchParams.append("q", query);
  return fetch(url)
    .then(response =>
      response.ok ? response.json() : Promise.reject(new Error(`Error in response: ${response.statusText}`))
    )
    .then((json: Geo[]) => {
      return Array.isArray(json) && json.length > 0
        ? Promise.resolve({
            lat: Number.parseFloat(json[0].lat),
            lon: Number.parseFloat(json[0].lon),
          })
        : Promise.reject(new Error("No results found for query."));
    });
}
