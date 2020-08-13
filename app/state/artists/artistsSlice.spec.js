import {slice} from './artistsSlice'
import axios from 'axios';

jest.mock('axios');

describe('artistsSlice', () => {
	it('testAddArtists', () => {
		const initialState = {groupedByCountry: {}, errorGroupedByCountry: {} };
		const newArtistsByCountry = {
			country: "Armenia",
			artists: [{
				name: "David Bowie",
				listeners: "3530274",
				mbid: "5441c29d-3602-4898-b1a1-b77fa23b8e50",
				url: "https://www.last.fm/music/David+Bowie",
				streamable: "0",
			}, {
				name: "Radiohead",
				listeners: "4912903",
				mbid: "a74b1b7f-71a5-4011-9441-d0b5e4122711",
				url: "https://www.last.fm/music/Radiohead",
				streamable: "0"
			}]
		}
		const newStateExpected = {
			groupedByCountry: {
				"Armenia": [{
					"listeners": "3530274",
					"mbid": "5441c29d-3602-4898-b1a1-b77fa23b8e50",
					"name": "David Bowie",
					"streamable": "0",
					"url": "https://www.last.fm/music/David+Bowie"
				}, {
					"listeners": "4912903",
					"mbid": "a74b1b7f-71a5-4011-9441-d0b5e4122711",
					"name": "Radiohead",
					"streamable": "0",
					"url": "https://www.last.fm/music/Radiohead"
				}]
			}, errorGroupedByCountry: {}
		}
		const newState = slice.reducer(initialState, slice.actions.addArtists(newArtistsByCountry));
		expect(newState).toEqual(newStateExpected);
	});


	it('testAddArtists', () => {
		const newArtistsByCountry = {
			country: "Armenia",
			artists: [{
				name: "Queen",
				listeners: "3530274",
				mbid: "5441c29d-3602-4898-b1a1-b77fa23b8e50",
				url: "https://www.last.fm/music/David+Bowie",
				streamable: "0",
			}]
		}
		const initialState = {
			groupedByCountry: {
				"Armenia": [{
					"listeners": "3530274",
					"mbid": "5441c29d-3602-4898-b1a1-b77fa23b8e50",
					"name": "David Bowie",
					"streamable": "0",
					"url": "https://www.last.fm/music/David+Bowie"
				}, {
					"listeners": "4912903",
					"mbid": "a74b1b7f-71a5-4011-9441-d0b5e4122711",
					"name": "Radiohead",
					"streamable": "0",
					"url": "https://www.last.fm/music/Radiohead"
				}]
			},
			errorGroupedByCountry: {}
		}

		const newStateExpected = {
			groupedByCountry: {
				"Armenia": [{
					"listeners": "3530274",
					"mbid": "5441c29d-3602-4898-b1a1-b77fa23b8e50",
					"name": "David Bowie",
					"streamable": "0",
					"url": "https://www.last.fm/music/David+Bowie"
				}, {
					"listeners": "4912903",
					"mbid": "a74b1b7f-71a5-4011-9441-d0b5e4122711",
					"name": "Radiohead",
					"streamable": "0",
					"url": "https://www.last.fm/music/Radiohead"
				}, {
					"listeners": "3530274",
					"mbid": "5441c29d-3602-4898-b1a1-b77fa23b8e50",
					"name": "Queen",
					"streamable": "0",
					"url": "https://www.last.fm/music/David+Bowie",
				}]
			},
			errorGroupedByCountry: {}
		}
		const newState = slice.reducer(initialState, slice.actions.addArtists(newArtistsByCountry));
		expect(newState).toEqual(newStateExpected);
	});
});
