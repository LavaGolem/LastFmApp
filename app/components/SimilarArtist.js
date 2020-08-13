import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {getImageUri, ImageSize} from "../utils/ImageUtil";

export const SimilarArtist = ({artist, onPress}) => {
	const similarArtistsImageUrl = getImageUri(artist.image, ImageSize.SMALL);
	return <TouchableOpacity
		onPress={onPress}
		style={styles.artistBox}>
		{similarArtistsImageUrl && <Image source={{url: similarArtistsImageUrl}} style={styles.smallImage}/>}
		<Text style={styles.artistBoxName}> {artist.name} </Text>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	smallImage: {
		width: 146,
		height: 100,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20
	},
	artistBox: {
		height: 150,
		width: 150,
		marginHorizontal: 5,
		padding: 0,
		backgroundColor: "#fff",
		borderRadius: 20,
		borderColor: "#d9d9d9",
		borderWidth: 2
	},
	artistBoxName: {
		fontSize: 14,
		fontWeight: "600",
		marginHorizontal: 10,
		marginTop: 10
	}
});
