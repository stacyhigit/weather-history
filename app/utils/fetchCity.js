'use server'

const formatGeoData = (json, searchString) => {
	const suggestions = json.map(location => {
		let areaString = location.admin1 ? `${location.admin1}, ${location.
			country}` : location.country
		if (location.country_code === 'US') {
			areaString = location.admin1
		}
		if (location.postcodes) {
			const found = location.postcodes.find(code => new RegExp(`^${searchString}`).test(code))
			if (found) {
				areaString += ` ${found}`
			}
		}

		return ({
			id: location.id,
			name: location.name,
			areas: areaString,
			latitude: location.latitude,
			longitude: location.longitude,
			timezone: location.timezone,
		})
	})
	return { props: { suggestions } }
}


export const fetchCity = async (value) => {
	const url = new URL(`${process.env.BASE_URL}/api/geocoding`)
	url.search = new URLSearchParams({ name: value, count: "10", format: "json" })

	const response = await fetch(url)
	if (response.ok) {
		const json = await response.json()
		if (json.results) {
			return formatGeoData(json.results)
		} else {
			return null
		}
	} else {
		console.error("Error fetching city", url, response)
		return "error"
	}
}