import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import UserImage from '../components/UserImage';

const FeedPage = (props) => {
    // Get images from backend somehow
    var img = "./components/animegirl.jpg";

    return (
        <UserImage source={require(img)}/>
    );
}
export default FeedPage;