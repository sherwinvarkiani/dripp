import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
    }
});

const UserImage = (props) => {
    // var icon = props.source ? require(props.source) : "";

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                styles={{ width: '100%', height: '100%'}}
                source={props.source}
            />
        </View>
    );
}
export default UserImage;