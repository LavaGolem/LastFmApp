import { configureStore } from '@reduxjs/toolkit';
import artistsReducer from './artists/artistsSlice';
import artistInfoReducer from './artistInfo/artistInfoSlice';


export default configureStore({
	reducer: {
		artistsByCountry: artistsReducer,
		artistInfo: artistInfoReducer
	}
});
