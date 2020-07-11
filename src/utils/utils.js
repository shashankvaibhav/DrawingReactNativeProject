import {
    PermissionsAndroid
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";

// Check for permission in Android
export async function hasAndroidPermission(permission) {
    if (!permission) {
        throw "Permission missing"
    }

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

// After checking for permission returns photos
export async function getPhotos(numberOfPhotos) {
    if (hasAndroidPermission) {
        const photos = await CameraRoll.getPhotos({
            first: numberOfPhotos,
            assetType: 'Photos',
        });

        return photos.edges;
    }

    return [];
}