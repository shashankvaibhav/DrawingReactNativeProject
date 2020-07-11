import React from 'react';
import {
    FlatList,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default ColorComponent = (props) => {

    // Check for all the corner cases
    handleColorClick = (color) => {
        if (typeof props.colorSelected == 'function') {
            props.colorSelected(color)
        }
    }

    if (!props.showColorWindow) {
        return null
    }


    return (
        <View style={{ flex: 1, zIndex: 100, backgroundColor: 'white' }}>
            <FlatList
                data={props.colors}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{ width: 100, height: 100, backgroundColor: item }} onPress={() => handleColorClick(item)} />
                )}
                numColumns={2}
                keyExtractor={(index) => index.toString()}
            />
        </View>
    )
}