import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";

export const Loader = () => {
	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator
				color='#bc2b78'
				size="large"
				style={styles.activityIndicator}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 70
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 80
	}
});
