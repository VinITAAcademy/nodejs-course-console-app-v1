import fs from "node:fs/promises";
import path from "node:path";
const CACHE_FILE = "./geocode-cache.json";

export class GeocodeCache {
  #geocodeProvider;
  #cacheDir;

  constructor(geocodeProvider, cacheDir) {
    this.#geocodeProvider = geocodeProvider;
    this.#cacheDir = cacheDir;
  }

  async getCoordinatesByCityName(name) {
    const cache = {};
    const result = await this.#geocodeProvider.getCoordinatesByCityName(name);
    cache[name] = result;
    await this.#writeToCache(cache);
    return result;
  }

  async #writeToCache(cache) {
    const json = JSON.stringify(cache);
    try {
      await fs.writeFile(this.#fileName(), json);
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.mkdir(this.#cacheDir);
        await fs.writeFile(this.#fileName(), json);
      } else {
        throw err;
      }
    }
  }

  #fileName() {
    return path.join(this.#cacheDir, CACHE_FILE);
  }
}
