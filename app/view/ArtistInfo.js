import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, StyleSheet, Linking, Image, ScrollView} from 'react-native';
import { isEmpty } from 'ramda';

import {
	getArtistInfo,
	selectArtistInfo,
	selectErrorArtistInfo
} from '../state/artistInfo/artistInfoSlice';
import {Loader} from "../components/Loader";
import {ErrorPage} from "./ErrorPage";
import {getImageUri, ImageSize} from "../utils/ImageUtil";
import {SimilarArtist} from "../components/SimilarArtist";

export const ArtistInfo = ({route, navigation}) => {

	const artistName = route.params.artistName;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getArtistInfo(artistName));
	}, []);

	const error = useSelector(selectErrorArtistInfo(artistName));

	const artistInfoData = useSelector(selectArtistInfo(artistName));
	return (<View>
		{!isEmpty(error) ? <ErrorPage error={error}/> : <ScrollView>
			{isEmpty(artistInfoData) ? <Loader/> :
				<View style={[styles.padding, styles.container]}>
					<Text style={styles.artistName}>{artistInfoData.artist && artistInfoData.artist.name}</Text>
					{artistInfoData.artist.image && <Image source={{uri: getImageUri(artistInfoData.artist.image, ImageSize.MEDIUM)}}
								 style={[styles.mediumImage, styles.padding]}/>}
					<Text style={styles.boxContainer} numberOfLines={8}>
						{artistInfoData.artist.bio.content}
					</Text>
					<Text
						style={{color: '#000080'}}
						onPress={() => {
							Linking.openURL(artistInfoData.artist.url)
						}}
					>Read more</Text>
					<View style={styles.similarArtists}>
						<Text style={[styles.similarTitle]}>Similar artists</Text>
						<ScrollView contentContainerStyle={styles.horizontalView} horizontal={true}>
							{artistInfoData.artist.similar.artist.map((x, index) => {
								return <SimilarArtist artist={x}
																			key={x.name + index}
																			onPress={() => navigation.push('ArtistInfo', {artistName: x.name})}/>;
							})
							}
						</ScrollView>
					</View>
				</View>}
		</ScrollView>}
	</View>);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: "#fff"
	},
	boxContainer: {
		paddingHorizontal: 15,
		fontSize: 18,
		lineHeight: 28
	},
	padding: {
		paddingVertical: 30
	},
	artistName: {
		fontSize: 26,
		textTransform: "uppercase",
		fontWeight: "800",
		marginBottom: 20
	},
	mediumImage: {
		width: 350,
		height: 340,
		borderRadius: 2,
		overflow: "hidden",
	},
	horizontalView: {
		paddingHorizontal: 10
	},
	similarArtists: {
		backgroundColor: "#fafafa",
		marginTop: 40,
		paddingVertical: 40,
	},
	similarTitle: {
		fontSize: 18,
		textTransform: "uppercase",
		fontWeight: "700",
		alignContent: 'center',
		textAlign: 'center',
		marginBottom: 20,
		paddingHorizontal: 15,
	}
});


