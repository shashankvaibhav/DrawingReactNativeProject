import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';

import Svg, {
    Circle
} from 'react-native-svg';

export default BrushesComponent = (props) => {

    handleStrockWidth = (item) => {
        props.handleStrockWidth(item)
    }

    return (
        <View style={props.style}>
            <FlatList
                data={props.strokes}
                horizontal={true}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ height: 50, width: 50 }} onPress={() => handleStrockWidth(item)}>
                            <Svg height="100%" width="100%" >
                                <Circle cx="25" cy="25" r={item.renderWidth} fill="black" />
                            </Svg>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(index) => index.toString()}
            />
        </View>
    )
}