import React from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default HeaderComponent = (props) => {

    return (
        <View style={props.style}>
            <Button onPress={() => { Actions.pop() }} style={style.button} title="Back" />
            <Button onPress={() => { props.undoLastMove() }} style={style.button} title="Undo" />
            <Button onPress={() => { props.redoLastUndo() }} style={style.button} title="Redo" />
            <Button onPress={() => { props.save() }} style={style.button} title="Save" />
            <Button onPress={() => { props.changeColor() }} style={style.button} title="Colors" />
        </View>
    )
}

const style = StyleSheet.create({
    button: {
        flex: 1
    }
})