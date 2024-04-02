"use client"
import { createContext, useState } from "react"
import weatherData from "@/app/data/weather.json"

export const SelectionsContext = createContext()

export const SelectionsProvider = ({ children }) => {

	const [selectedUnits, setSelectedUnits] = useState({
		Temperature: "",
		Wind: ""
	})

	const [startDate, setStartDate] = useState("")

	const [selectedCity, setSelectedCity] = useState({
		id: 0,
		name: "",
		areas: "",
		latitude: 0,
		longitude: 0,
		timezone: "",
	})

	const setWeatherUnits = (data, units) => {
		return data.map(d => {
			if (units?.Temperature?.value === "fahrenheit") {
				d.temperature_2m_display = d.temperature_2m
				d.apparent_temperature_display = d.apparent_temperature
				d.dew_point_2m_display = d.dew_point_2m
			}
			if (units?.Temperature?.value === "celsius") {
				d.temperature_2m_display = (d.temperature_2m - 32) / 1.8
				d.apparent_temperature_display = (d.apparent_temperature - 32)/ 1.8
				d.dew_point_2m_display = (d.dew_point_2m - 32) / 1.8
			}
			if (units?.Wind?.value === "mph") {
				d.wind_speed_10m_display = d.wind_speed_10m
			}
			if (units?.Wind?.value === "kmh") {
				d.wind_speed_10m_display = d.wind_speed_10m * 1.60934
			}
			if (units?.Wind?.value === "kn") {
				d.wind_speed_10m_display = d.wind_speed_10m * 0.868976
			}
			return d
		})
	} 

	const [searchWeather, setSearchWeather] = (useState(false))
	const [weather, setWeather] = useState({
		city: "New York",
		time: "December 31 at 11pm EDT",
		data: weatherData
	})

	const handleSetWeather = (weather, units) => {
		setWeather({
			...weather,
			data: setWeatherUnits(weather.data, units)
		})
	}

	return (
		<SelectionsContext.Provider value={({
			selectedUnits, setSelectedUnits,
			startDate, setStartDate,
			selectedCity, setSelectedCity,
			searchWeather, setSearchWeather,
			weather, handleSetWeather
		})}>
			{children}
		</SelectionsContext.Provider>
	)
}
