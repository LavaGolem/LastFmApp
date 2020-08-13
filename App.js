import React from 'react';
import 'react-native-gesture-handler';
import store from './app/state/store';
import {Provider} from 'react-redux';
import {Artists} from "./app/view/Artists";
import {Countries} from "./app/view/Countries";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ArtistInfo} from "./app/view/ArtistInfo";

const Stack = createStackNavigator();

export default function App() {

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Countries"
						component={Countries}
						options={{title: "Countries"}}
					/>
					<Stack.Screen
						name="Artists"
						component={Artists}
						options={({ route }) => ({ title: route.params.countryName })}
					/>
					<Stack.Screen
						name="ArtistInfo"
						component={ArtistInfo}
						options={({ route }) => ({ title: route.params.artistName })}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
