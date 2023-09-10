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
    await fs.writeFile(path.join(this.#cacheDir, CACHE_FILE), json);
  }
}
