import test, { beforeEach, describe, mock } from "node:test";
import assert from "node:assert/strict";
import { OpenMeteo } from "./open-meteo.js";

describe("OpenMeteo", () => {
  let client;
  beforeEach(() => {
    client = new OpenMeteo();
  });

  describe("getCurrentWeatherByCoordinates()", () => {
    test("should return current weather", async () => {
      const time = dateRounded(new Date());
      const expectedTemperature = 21;

      mockFetchOnce({
        current_weather: {
          temperature: expectedTemperature,
          time,
        },
      });

      const weather = await client.getCurrentWeatherByCoordinates(
        "49.2328",
        "28.4816",
      );

      assert.equal(weather.temperature, 21);
      assert.equal(weather.time.getTime(), time.getTime());
    });
  });
});

function mockFetchOnce(response) {
  return mock.method(
    globalThis,
    "fetch",
    async () => {
      return new Response(JSON.stringify(response));
    },
    { times: 1 },
  );
}

function dateRounded(date) {
  const newDate = new Date(date);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
}
