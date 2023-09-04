export class OpenMeteo {
  constructor() {}

  async getCurrentWeatherByCoordinates(lat, long) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", long);
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("timezone", tz);

    const resp = await fetch(url);
    const result = await resp.json();

    const { time, temperature } = result.current_weather;

    return {
      temperature,
      time: new Date(time),
    };
  }
}
