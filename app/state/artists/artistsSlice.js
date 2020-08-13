import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {artistsByCountryUrl} from "../../utils/UrlUtil";

export const slice = createSlice({
	name: 'artistsByCountry',
	initialState: {
		groupedByCountry: {},
		errorGroupedByCountry: {}
	},
	reducers: {
		addArtists: (state, action) => {
			const {artists, country} = action.payload;
			const existingArtists = state.groupedByCountry[country] || [];

			return {
				...state,
				groupedByCountry: {
					...state.groupedByCountry,
					[country]: existingArtists.concat(artists)
				},
				errorGroupedByCountry: Object.keys(state.errorGroupedByCountry)
					.filter(countryKey => countryKey !== country)
					.reduce((acc, key) => ({ [key]: state.errorGroupedByCountry[key] }), {})
			}
		},
		addError: (state, action) => {
			const {error, country} = action.payload;
			return {
				...state,
				errorGroupedByCountry: {
					[country]: error
				}
			}
		}
	},
});

const {addArtists, addError} = slice.actions;

export const getArtistsByCountry = (country, nextPage) => (dispatch, getState) => {
	const artistsCurrentCount = selectArtistsByCountry(country)(getState()).length;
	if (artistsCurrentCount !== 0 && !nextPage) {
		return;
	}
	axios.get(artistsByCountryUrl(country, artistsCurrentCount), {headers: {'User-Agent': 'LAVA_LAST_FM_API'}})
		.then(artists => {
				if (!artists || !artists.data || !artists.data.topartists) {
					return dispatch(addError({country, error: {message: "Invalid data received from LastFM API"}}))
				}

				dispatch(addArtists({
					country: country,
					artists: artists.data.topartists.artist,
				}));
			}
		)
		.catch(error => {
			if (!error.response) {
				dispatch(addError({error: {message: "Something went wrong! Check your internet connection"}, country}))
			} else {
				dispatch(addError({error: error.response.data, country}))
			}
		});
};

export const selectArtistsByCountry = (country, filterByName = '') => (state) => {
	const artists = state.artistsByCountry.groupedByCountry[country] || []
	return artists.filter(x => x.name.toUpperCase().includes(filterByName.toUpperCase()))
};

export const selectErrorArtistsByCountry = country => (state) => {
	return state.artistsByCountry.errorGroupedByCountry[country] || {}
};

export default slice.reducer;
