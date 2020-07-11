import React, { useState } from 'react';
import {
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    RefreshControl
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default GalleryComponent = (props) => {

    // Check for all the corner cases
    handlePhotoClick = (uri) => {

        if (uri && typeof uri == 'string' && typeof props.photoSelected == 'function') {
            props.photoSelected(uri)
        }
    }

    // Hooks setup
    const [refreshing, setRefreshing] = useState(false);

    onRefresh = () => {
        setRefreshing(true);
        props.refreshGallery();
        setRefreshing(false);
    }

    return (
        <FlatList
            data={props.photos}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => handlePhotoClick(item.node.image.uri)}>
                    <Image
                        key={index}
                        style={{
                            width: (width / 2) - 10,
                            height: (width / 2) - 10,
                            margin: 5
                        }}
                        source={{ uri: item.node.image.uri }}
                    />
                </TouchableOpacity>
            )}
            numColumns={2}
            keyExtractor={(index) => index.toString()}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={()=> onRefresh()} />
            }

        />
    )
}