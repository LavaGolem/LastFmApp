import React from 'react';
import {View, Text, StyleSheet} from "react-native";

export const ErrorPage = ({error}) => {
	return(
		<View style={styles.container}>
			<Text style={styles.errorText}>{error.message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent:"center",
		alignItems: "center",
		marginTop: 30,
		marginHorizontal: 30
	},
	errorText: {
		textAlign:'center',
		fontSize: 18,
		fontWeight: 'bold'
	}
});

