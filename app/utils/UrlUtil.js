import {API_KEY} from "../../env/Config";

export const artistInfoUrl = (artistName) =>
`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`;

export const artistsByCountryUrl = (country, currentCount) => {
	const page = getPageNumber(currentCount);
	return `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${API_KEY}&page=${page}&format=json`;
}

const getPageNumber = (currentCount) => {
	let page = currentCount / 50;
	return currentCount % 50 > 0 ? page + 2 : page + 1;
};
