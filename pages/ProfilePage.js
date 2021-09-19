import React from 'react';
import { View, ScrollView, Image } from 'react-native';

const ProfilePage = () => {
    const userData = require('../mockdata.json');

    var matrix = [];
    for (let i = 0, k = -1; i < userData.length; i++) {
        if (i % 2 === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(userData[i]);
    }

    return (
        <ScrollView style={{ marginTop: 20 }}>
            {matrix.map(column => (
                <View key={column[0]._id} style={{ flex: 1, justifyContent: 'space-evenly', margin: 15, flexDirection: 'row' }}>
                    {column.map(row => <Image style={{ height: 150, width: 150 }} source={require("../components/animegirl2.jpg")} />)}
                </View>
            ))}
        </ScrollView>
    );
}
export default ProfilePage;
