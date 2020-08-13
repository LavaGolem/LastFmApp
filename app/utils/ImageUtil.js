export const ImageSize = {
	MEDIUM: "medium",
	SMALL: "small",
};
export const getImageUri = (data, size) => {
	const image = data.find(x => x.size === size);
	return image && image['#text'];
};
