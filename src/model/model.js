import { getHistoricalEvent } from './apiModel';

export default {
	currentYear: 2000,
	isDarkMode: false,

	getHistoricalEvent(year) {
		return getHistoricalEvent(year);
	},

	getCountryObject(name, events, splineObj) {
		return { name, events, splineObj }
	},
};
