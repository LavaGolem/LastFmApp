import React from "react";
import {SearchBar} from "react-native-elements";
import {StyleSheet} from "react-native";

export const Search = ({updateSearch, search}	) => {
	return (
		<SearchBar
			inputStyle={styles.inputStyle}
			containerStyle={styles.containerStyle}
			innerBorderStyle={styles.iconContainerStyle}
			placeholderTextColor={'#D3D3D3'}
			placeholder={'Start typing...'}
			onChangeText={value => updateSearch(value)}
			value={search}
		/>
	)
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: '#343434',
		borderWidth: 0,
		padding: 15,
	},
	inputStyle: {
		backgroundColor: 'white',
		paddingHorizontal: 10,
	},
	iconContainerStyle: {
		backgroundColor: 'red',
		borderWidth: 10,
		fontSize: 40,
	}
});
