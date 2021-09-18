import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const UserImage = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
            <Image
                styles={{ width: '100%', height: '100%'}}
                source={props.source}
            />
        </View>
    );
}
export default UserImage;