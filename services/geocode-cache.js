export class GeocodeCache {
  #geocodeProvider;

  constructor(geocodeProvider) {
    this.#geocodeProvider = geocodeProvider;
  }

  async getCoordinatesByCityName(name) {
    return await this.#geocodeProvider.getCoordinatesByCityName(name);
  }
}
