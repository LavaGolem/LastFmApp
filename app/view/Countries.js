import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView} from "react-native";
import countriesData from '../../static/countries.json';
import Emoji from 'react-native-emoji';
import {Search} from "../components/Search";
import {ListButton} from "../components/ListButton";

export const Countries = ({navigation}) => {
	const [search, setSearch] = useState("");
	return (
		<ScrollView style={styles.countries}>
			<Search updateSearch={(value) => setSearch(value)} search={search}/>
			{renderCountries(countriesData, search, navigation)}
		</ScrollView>
	);
};

const renderCountries = (data, filterValue, navigation) => {
	return data
		.filter(x => x.name.toUpperCase().includes(filterValue.toUpperCase())).map(x => <CountryButton
			onPress={() =>
				navigation.navigate('Artists', {countryName: x.name})
			}
			title={x.name}
			flagIso={x.alpha2Code}
			key={x.alpha2Code}/>);
}

const CountryButton = ({onPress, title, flagIso}) => {
	return (<ListButton onPress={onPress}>
		<Emoji name={`flag-${flagIso.toLowerCase()}`} style={{fontSize: 40}}/>
		<Text style={styles.countryButtonText}>{title}</Text>
	</ListButton>);
}

const styles = StyleSheet.create({
	countryButtonText: {
		fontSize: 18,
		color: "#474747",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "capitalize",
		paddingHorizontal: 15,
	},
	countries: {
		backgroundColor: "#fff"
	}
});
