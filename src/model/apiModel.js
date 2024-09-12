import { BASE_URL, API_KEY } from '../config/apiConfig';
import { countryRegex, categoryRegex } from '../constant/regexConst';

export async function getHistoricalEvent(year) {
	const query = new URLSearchParams({ year: year });
	const url = `${BASE_URL}?${query}`;

	const options = {
		headers: {
			'X-Api-Key': API_KEY,
		},
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		const mappedData = data.map(keepEventDescription);
		let filteredData = [];

		for (const eventDescription of mappedData) {
			for (const countryArray of countryRegex) {
				if (
					countryArray.some((country) => eventDescription.includes(country))
				) {
					if (!filteredData.includes(eventDescription)) {
						filteredData.push(eventDescription);
					} 
					for (const category in categoryRegex) {
						for (const keyword of categoryRegex[category]) {
							if (
								eventDescription.includes(keyword) ||
								eventDescription.toLowerCase().includes(keyword)
							) {
								//return eventDescription + ' (' + category.toUpperCase() + ')';
								// vi filtrerar inte på kategori tills vidare pga enklare implementering
							}
						}
					}
				}
			}
		}

		
		//console.log(filteredData);

		return filteredData

	} catch (error) {
		return 'No historical event found for this year.';
	}
}

function keepEventDescription(event) {
	return event.event;
}
