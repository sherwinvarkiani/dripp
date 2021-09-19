import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { Button } from "react-native-paper";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    }
});

const ChooseImage = ({ handleUpload }) => {
    const [camPerm, setCamPerm] = useState(false);

    useEffect(async () => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(res => {
            setCamPerm(res);
        })
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            setCamPerm(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const cameraLaunch = () => {
        launchCamera({
            skipBackup: true,
            path: 'images',
        },
            (res) => {
                if (!res.didCancel && !res.error && !res.customButton) {
                    handleUpload(res);
                }
            }
        );
    }

    const imageGalleryLaunch = () => {
        launchImageLibrary({
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        },
            (res) => {
                if (!res.didCancel && !res.error && !res.customButton) {
                    handleUpload(res);
                }
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Button icon="camera" labelStyle={{ color: '#fff' }} disabled={!camPerm} onPress={cameraLaunch} style={styles.button}>
                    <Text style={styles.buttonText}>Camera</Text>
                </Button>
                <Button icon="image" labelStyle={{ color: '#fff' }} onPress={imageGalleryLaunch} style={styles.button}  >
                    <Text style={styles.buttonText}>Gallery</Text>
                </Button>
            </View>
        </View>
    );
}

export default ChooseImage;
