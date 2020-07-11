import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    PanResponder,
    View
} from 'react-native';

import Svg, {
    Path,
    Circle
} from 'react-native-svg';
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

export default class DrawPad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStrokes: '',
            currentColor: props.currentColor ? props.currentColor : '#000000',
            currentStrokeWidth: props.currentStrokeWidth ? props.currentStrokeWidth : 5,
            previousStrokes: [],
            backgroundPhoto: props.backgroundPhoto,
            undoObject: []
        };
    }


    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,

        onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now

            this.setState({
                currentStrokes: ("M" + evt.nativeEvent.locationX + ' ' + evt.nativeEvent.locationY)
            })
        },
        onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}

            this.setState({
                currentStrokes: this.state.currentStrokes + (" L" + evt.nativeEvent.locationX + ' ' + evt.nativeEvent.locationY)
            })
        },
        onPanResponderTerminationRequest: (evt, gestureState) => {
            return true;
        },
        onPanResponderRelease: (evt, gestureState) => {
            let previousStrokesArray = [];
            previousStrokesArray = this.state.previousStrokes
            previousStrokesArray.push({
                d: this.state.currentStrokes,
                stroke: this.props.currentColor,
                strokeWidth: this.props.currentStrokeWidth
            });

            this.setState({
                previousStrokes: previousStrokesArray,
                currentStrokes: ''
            })
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        }
    });

    renderPreviousStrokes = (e, tracker) => {
        return <Path
            key={tracker}
            d={e.d}
            stroke={e.stroke || "#000000"}
            strokeWidth={e.strokeWidth || 4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    }

    undo = () => {
        let strokesArray = this.state.previousStrokes
        const undoObject = strokesArray.pop()

        let strokesUndoArray = this.state.undoObject
        strokesUndoArray.push(undoObject)
        this.state.undoObject = strokesUndoArray;

        this.setState({
            previousStrokes: strokesArray,
        })
    }

    redo = () => {
        let strokesArray = this.state.previousStrokes
        if (strokesArray && this.state.undoObject && (this.state.undoObject).length) {
            let strokesUndoArray = this.state.undoObject
            const redoObject = strokesUndoArray.pop()
            this.state.undoObject = strokesUndoArray;

            strokesArray.push(redoObject)
            this.setState({
                previousStrokes: strokesArray,
            })
        }
    }


    save = async () => {
        if (this.state.previousStrokes.length == 0) {
            return
        }

        this.refs.viewShot.capture().then(uri => {
            CameraRoll.save(uri)
        })
    }

    render() {
        return (
            <View style={this.props.style}>
                <ViewShot style={styles.parent} ref="viewShot"  >
                    <View style={styles.parent}  {...this.panResponder.panHandlers}>
                        <Image style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} source={{ uri: this.state.backgroundPhoto }}>

                        </Image>
                        <Svg height="100%" width="100%" >

                            {this.state.previousStrokes.map((stroke, index) => {
                                return this.renderPreviousStrokes(stroke, index)
                            })}

                            <Path
                                d={this.state.currentStrokes}
                                stroke={this.props.currentColor || "#000000"}
                                strokeWidth={this.props.currentStrokeWidth || 4}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                key={this.state.currentStrokes.length.toString}
                            />
                        </Svg>

                    </View>
                </ViewShot>
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
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
