import axios from "axios";

export const getCountries = () => {
	return axios.get("https://restcountries.eu/rest/v2/all")
	.then((data) => data.data);
};
