import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, StyleSheet, TouchableOpacity, FlatList, View, ActivityIndicator, ScrollView, Image} from 'react-native';
import {
	getArtistsByCountry,
	selectArtistsByCountry,
	selectErrorArtistsByCountry
} from '../state/artists/artistsSlice';
import {useNavigation} from '@react-navigation/native'
import {Loader} from "../components/Loader";
import {Search} from "../components/Search";
import {ListButton} from "../components/ListButton";
import {ErrorPage} from "./ErrorPage";
import R from 'ramda';
import {getImageUri, ImageSize} from "../utils/ImageUtil";

export const Artists = ({route, navigation}) => {

	const countryName = route.params.countryName;

	const dispatch = useDispatch();

	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(getArtistsByCountry(countryName));
	}, []);

	const artists = useSelector(selectArtistsByCountry(countryName, search));
	const error = useSelector(selectErrorArtistsByCountry(countryName));

	const onEndReached = () => {
		dispatch(getArtistsByCountry(countryName, true));
	}

	//There is no unique key for artist per country so it is combined with index
	//API sometimes returns duplicated artists (duplicated pages)
	return (
		<View>{(!R.isEmpty(error)) && <ErrorPage error={error}/>}
			{R.isEmpty(error) &&
			<View style={styles.artists}>
				{artists.length === 0 ? <Loader /> : <View><Search updateSearch={(value) => setSearch(value)} search={search}/>
					<FlatList data={artists}
										renderItem={item => <ArtistButton {...item} />}
										keyExtractor={(item, index) => item.mbid + index}
										onEndReachedThreshold={0.1}
										onEndReached={onEndReached}/></View>}
			</View>
			}
		</View>
	);
};

const ArtistButton = ({item}) => {
	const navigation = useNavigation();
	const imageUri = getImageUri(item.image, ImageSize.SMALL)
	return (
		<ListButton onPress={() => navigation.navigate('ArtistInfo', {artistName: item.name})}>
			{imageUri && <Image source={{uri: imageUri}} style={{height: 20, width: 20}} />}
			<Text style={styles.listButtonText}>{item.name}</Text>
		</ListButton>
	)
};

const styles = StyleSheet.create({
	listButtonText: {
		paddingVertical: 5,
		fontSize: 18,
		color: "#474747",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "capitalize",
		backgroundColor: "transparent",
		borderWidth: 0,
		paddingHorizontal: 15,
	},
	artists: {
		backgroundColor: "#fff"
	}
});
