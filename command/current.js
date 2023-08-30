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

  if (city && city.length < 2) {
    throw new Error("City name should be longer than 2 characters");
  }
}
