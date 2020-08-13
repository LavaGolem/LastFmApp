import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {artistInfoUrl} from "../../utils/UrlUtil";
import R from 'ramda';

export const slice = createSlice({
	name: 'artistInfo',
	initialState: {
		artistInfo: {},
		artistInfoError: {}
	},
	reducers: {
		addArtistInfo: (state, action) => {
			const {data, artistName} = action.payload;
			return {
				...state,
				artistInfo: {
					...state.artistInfo,
					[artistName]: data
				},
				artistInfoError: Object.keys(state.artistInfoError)
					.filter(artistKey => artistKey !== artistName)
					.reduce((acc, key) => ({ [key]: state.artistInfoError[key] }), {})

			}
		},
		addError: (state, action) => {
			const {error, artistName} = action.payload;
			return {
				...state,
				artistInfoError: {
					...state.artistInfoError,
					[artistName]: error
				}
			}
		}
	},
});

export const {addArtistInfo, addError} = slice.actions;

export const getArtistInfo = artistName => (dispatch, getState) => {
	if (!R.isEmpty(selectArtistInfo(artistName)(getState()))) {
		return;
	}
	axios.get(artistInfoUrl(artistName), {headers: {'User-Agent': 'LAVA_LAST_FM_API'}})
		.then(artistInfo => {
				dispatch(addArtistInfo({data: artistInfo.data, artistName: artistName}));
			}
		).catch((error) => {
		if (!error.response) {
			dispatch(addError({error: {message: "Something went wrong! Check your internet connection"}, artistName}))
		} else {
			dispatch(addError({error: error.response.data, artistName}))
		}
	});
};

export const selectArtistInfo = artistName => state => {
	return state.artistInfo.artistInfo[artistName] || {};
};

export const selectErrorArtistInfo = artistName => state => {
	return state.artistInfo.artistInfoError[artistName] || {}
};

export default slice.reducer;
