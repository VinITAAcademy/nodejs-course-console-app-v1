import test, { afterEach, beforeEach, describe, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { GeocodeCache } from "./geocode-cache.js";
import path from "node:path";

describe("GeocodeCache", () => {
  let geocodeProvider;
  let cache;

  beforeEach(() => {
    geocodeProvider = {
      async getCoordinatesByCityName() {},
    };
    cache = new GeocodeCache(geocodeProvider, "some-dir");
  });

  afterEach(() => {
    mock.restoreAll();
  });

  test("should return data from provider and store in cache", async () => {
    mock.method(fs, "readFile", async () => {
      const e = new Error("ENOENT");
      e.code = "ENOENT";
      return e;
    });
    const mockGeocodeProvider = mock.method(
      geocodeProvider,
      "getCoordinatesByCityName",
      async () => ({
        latitude: 49.2328,
        longitude: 28.4816,
      }),
    );
    const mockWriteFile = mock.method(fs, "writeFile", async () => {});

    const result = await cache.getCoordinatesByCityName("Vinnytsia");

    assert.equal(result.latitude, 49.2328);
    assert.equal(result.longitude, 28.4816);

    assert.equal(mockGeocodeProvider.mock.calls.length, 1);
    assert.equal(mockGeocodeProvider.mock.calls[0].arguments[0], "Vinnytsia");

    assert.equal(mockWriteFile.mock.calls.length, 1);
    assert.equal(
      mockWriteFile.mock.calls[0].arguments[0],
      `some-dir${path.sep}geocode-cache.json`,
    );
    assert.equal(
      mockWriteFile.mock.calls[0].arguments[1],
      JSON.stringify({ Vinnytsia: { latitude: 49.2328, longitude: 28.4816 } }),
    );
  });
});
