import assert from "assert";
import { fetchUCalWeather, fetchUMassWeather, fetchUniversityWeather } from "./universityWeather.js";
// 1000ms
const SECOND = 1000;
// 30 second timeout
jest.setTimeout(30 * SECOND);

describe("fetchUCalWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
      assert(Object.keys(result)[0] === "totalAverage");
    });
  });
  it("checks the key of first element in the object is totalAverage and the length is correct", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(Object.keys(result).length === 12);
      assert(Object.keys(result)[0] === "totalAverage");
    });
  });
});

describe("fetchUMassWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });
  it("checks the key of first element in the object is totalAverage and the length is correct", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(Object.keys(result).length === 5);
      assert(Object.keys(result)[0] === "totalAverage");
    });
  });
  it("checks if the object contains all the universities with original name", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(Object.keys(result).length === 5);
      assert(Object.keys(result)[1] === "University of Massachusetts Boston");
      assert(Object.keys(result)[2] === "University of Massachusetts at Dartmouth");
      assert(Object.keys(result)[3] === "University of Massachusetts at Lowell");
      assert(Object.keys(result)[4] === "University of Massachusetts at Amherst");
    });
  });
});
describe("UniversityWeather", () => {
  it("checks the key of first element in the object is totalAverage and the length is correct", () => {
    const promise = fetchUniversityWeather("boston college");

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(Object.keys(result).length === 2);
      assert(Object.keys(result)[0] === "totalAverage");
      assert(Object.keys(result)[1] === "Boston College");
    });
  });
});
