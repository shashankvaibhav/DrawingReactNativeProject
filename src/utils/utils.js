import {
    PermissionsAndroid
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";
import { captureRef } from "react-native-view-shot";

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