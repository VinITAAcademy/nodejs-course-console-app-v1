export function getCurrentWeather({ city, lat, long }) {
  const weather = {
    temperature: 37,
  };
  const location = city ?? `${lat} ${long}`;
  console.log(`Current weather in ${location}: ${weather.temperature} °C`);
}

export function validate({ city, lat, long }) {
  if (!city && !(lat && long)) {
    throw new Error("Either city or lat and long should be present");
  }
}
