import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import UserImage from '../components/UserImage';
import { Subheading } from 'react-native-paper';

const HomePage = (props) => {

    // Get user data
    const userData = require('../mockdata.json');

    var matrix = [], i, k;

    for (i = 0, k = -1; i < userData.length; i++) {
        if (i % 2 === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(userData[i]);
    }

    return (
        <ScrollView style={{ marginTop: 20 }}>
            {matrix.map(column => {
                return (
                    <View key={column[0]._id} style={{ flex: 1, justifyContent: 'space-evenly', margin: 15, flexDirection: 'row'}}>
                        {column.map(row => {
                            return (
                                <Image style={{ height: 150, width: 150 }} source={require("../components/animegirl2.jpg")}/>
                            );
                        })}
                    </View>
                );
                
            })}
        </ScrollView>
        // {/* {data.map(element => {
        //     return (
        //         <View style={{ flex: 1, flexDirection: 'column' }}>
        //             <View style={{ flex: 1, flexDirection: 'row'}}>
                        
        //             </View>
        //         </View>
        //     );
            
        // })} */}
    );
}
export default HomePage;