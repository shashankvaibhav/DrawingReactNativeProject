import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert
} from 'react-native';

import Header from './components/header.component'
import DrawPad from './components/drawPad.component'
import Brushes from './components/brushes.component'
import Colors from './components/colors.component'

import { Actions } from 'react-native-router-flux';

const brushesObject = [
    {
        renderWidth: 5,
        actualStrokeWidth: 2
    },
    {
        renderWidth: 10,
        actualStrokeWidth: 5
    },
    {
        renderWidth: 15,
        actualStrokeWidth: 7
    }
]

const colorsObject = [
    '#000000',
    '#32a852',
    '#9a32a8',
    '#130414',
    '#d13a32',
    '#1b18c9',
    '#67676e',
    'red',
    'blue',
    'green'
]


export default class DrawPadScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentColor: '#000000',
            currentStrokeWidth: 5,
            backgroundPhoto: props.backgroundPhoto,
            undoObject: {},
            showColorWindow: false
        };
    }

    handleStrockWidth = (item) => {
        this.setState({
            currentStrokeWidth: item.actualStrokeWidth
        })
    }

    undoLastMove = () => {
        this.drawPad.undo();
    }

    redoLastUndo = () => {
        this.drawPad.redo();
    }

    save = async () => {
        await this.drawPad.save();
        Actions.pop();
        setTimeout(() => {
            Actions.refresh({
                p: Math.random()
            });
        }, 100);
    }

    changeColor = () => {
        this.setState({
            showColorWindow: true
        })
    }

    handleColorClick = (color) => {
        this.setState({
            currentColor: color,
            showColorWindow: false
        })
    }

    render() {
        const { currentColor, currentStrokeWidth, backgroundPhoto } = this.state;

        return (
            <View style={styles.parent}>
                <Header
                    style={{
                        position: 'absolute',
                        height: 60,
                        left: 0,
                        right: 0,
                        top: 0,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}

                    undoLastMove={this.undoLastMove}
                    redoLastUndo={this.redoLastUndo}
                    changeColor={this.changeColor}
                    save={this.save}
                />
                <DrawPad
                    ref={(r) => this.drawPad = r}
                    style={{
                        position: 'absolute',
                        top: 60,
                        left: 0,
                        right: 0,
                        bottom: 60,
                    }}
                    currentStrokeWidth={currentStrokeWidth}
                    currentColor={currentColor}
                    backgroundPhoto={backgroundPhoto} />


                <Brushes
                    style={{
                        position: 'absolute',
                        height: 60,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'white'
                    }}
                    strokes={brushesObject}
                    handleStrockWidth={this.handleStrockWidth} />

                <Colors
                    showColorWindow={this.state.showColorWindow}
                    colors={colorsObject}
                    colorSelected={this.handleColorClick} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
    }
});
