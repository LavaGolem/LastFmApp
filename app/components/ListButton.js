import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

export const ListButton = ({onPress, children}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.listButtonContainer}
		>
			{children}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listButtonContainer: {
		elevation: 3,
		backgroundColor: "white",
		margin: 10,
		borderColor: "#d9d9d9",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 15,
		marginBottom: 2,
		flexDirection: "row",
		alignItems: "center"
	}
});

