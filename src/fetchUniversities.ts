import fetch from "../include/fetch.js";

// making an interface to get rid of lint warnings, the converted jsonArray will be of this type
interface universities {
  alpha_two_code: string;
  domains: string[];
  web_pages: string[];
  name: string;
  "state-province": object;
  country: string;
}
export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  const url = new URL(" http://220.maxkuechen.com/universities/search");
  url.searchParams.append("name", query);
  return fetch(url)
    .then(response =>
      response.ok ? response.json() : Promise.reject(new Error(`Error in response: ${response.statusText}`))
    )
    .then((json: universities) => {
      return Array.isArray(json) && json.length > 0
        ? Promise.resolve(json.map((ele: universities) => ele.name))
        : Promise.resolve([]);
    });
}
