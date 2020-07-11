import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PermissionsAndroid,
    Button,
    Platform
} from 'react-native';

// Components
import GalleryComponent from './components/gallery.component'

// Navigation
import { Actions } from 'react-native-router-flux';

//Utils
import { hasAndroidPermission, getPhotos } from './utils/utils'

export default class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            hasPermission: -1
        };
    }

    // Check for all the permissions. Call CameraRoll for 50 photos to display
    componentDidMount = () => {
        this.checkPermissionAndGetPhotos();
    }

    // Check and fetch photos from the gallery
    checkPermissionAndGetPhotos = async () => {
        if (Platform.OS === 'ios') {
            const photos = await getPhotos(50)
            this.setState({
                photos,
                hasPermission: 1
            })
            return;
        } 

        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasRequiredPermission = await hasAndroidPermission(permission);

        if (hasRequiredPermission) {
            const photos = await getPhotos(50)
            this.setState({
                photos,
                hasPermission: 1
            })
        } else {
            this.setState({
                hasPermission: 0
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.checkPermissionAndGetPhotos();
    }

    // Handle click on a photo callback
    photoSelected = (uri) => {
        Actions.DRAW({
            backgroundPhoto: uri
        });
    }

    handleRefresh = () => {
        this.checkPermissionAndGetPhotos();
    }

    render() {
        return (
            <View style={styles.parent}>
                {this.state.hasPermission ? (
                    <GalleryComponent
                        photos={this.state.photos}
                        photoSelected={this.photoSelected}
                        handleRefresh={this.handleRefresh}
                        refreshGallery={this.handleRefresh}
                    />
                ) : (
                        <Button title={'Permission missing. Tap for permission'} onPress={this.handleRefresh} />
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
