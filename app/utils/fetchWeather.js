"use server";
import dayjs from "dayjs";

import weatherCodes from "@/app/data/weatherCodes.json";

const hourlySearchParams = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "weather_code",
  "wind_speed_10m",
  "dew_point_2m",
  "is_day",
];

const parseWeatherData = (dateString, year, data) => {
  if (data.time) {
    const index = data.time.indexOf(dateString);
    if (index >= 0) {
      const obj = Object.fromEntries(
        hourlySearchParams.map((param) => [param, data?.[param]?.[index]])
      );

      if (!obj.temperature_2m) {
        return { year: [year], index: -1 };
      }

      obj.index = index;
      obj.year = year;

      const dayNight = obj.is_day ? "day" : "night";
      obj.image = weatherCodes?.[obj.weather_code]?.[dayNight]?.image;
      obj.description =
        weatherCodes?.[obj.weather_code]?.[dayNight]?.description;

      return obj;
    }
  }
  return { year: [year], index: -1 };
};

const getUrlSearchParams = (searchDate, city) => {
  return {
    latitude: city.latitude,
    longitude: city.longitude,
    start_date: searchDate,
    end_date: searchDate,
    hourly: hourlySearchParams.join(","),
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timezone: city.timezone,
  };
};

export async function fetchWeather({ date, city }) {
  const dateString = dayjs(date).format("YYYY-MM-DDTHH:00");
  const year = dateString.slice(0, 4);
  const searchDate = dateString.slice(0, 10);

  const url = new URL(`${process.env.BASE_URL}/api/weather-archive`);
  url.search = new URLSearchParams(getUrlSearchParams(searchDate, city));

  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    if (json.hourly) {
      return parseWeatherData(dateString, year, json.hourly);
    } else {
      console.error("no data", json);
      return { year, index: -2 };
    }
  } else {
    console.error("Error fetching weather", response);
    return { year, index: -3 };
  }
}
