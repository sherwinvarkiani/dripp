import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import FeedPage from './FeedPage';
import { Icon } from 'react-native-elements';
import Dialog from "react-native-dialog";

const ProfilePage = () => {
    const userData = require('../mockdata.json');
    const [showImage, setShowImage] = useState(false);
    const [imageData, setImageData] = useState({})
    const [showSaveImageDialog, setShowSaveImageDialog] = useState(false);

    var matrix = [];
    for (let i = 0, k = -1; i < userData.length; i++) {
        if (i % 2 === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(userData[i]);
    }

    const handlePress = () => {
        setShowSaveImageDialog(false)
    }

    return (
        <View>
            {showSaveImageDialog && (
                <View>
                <Dialog.Container visible={true}>
                  <Dialog.Title>Save Image</Dialog.Title>
                  <Dialog.Description>
                    Do you want to save this image before it is deleted?
                  </Dialog.Description>
                  <Dialog.Button label="Cancel" onPress={handlePress}/>
                  <Dialog.Button label="Save" onPress={handlePress}/>
                </Dialog.Container>
              </View>
            )}
            {showImage && (
                <View>
                    <View style={{ position: 'absolute', left: "5%", top: "5%", zIndex: 1, justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-start' }}
                            onPress={() => {setImageData({}); setShowImage(false);}}
                        >
                            <Icon
                                reverse
                                name="back"
                                type="antdesign"
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                    scrollEnabled={false}
                    data={[imageData]}
                    key={imageData._id}
                    renderItem={({ item }) =>
                    <FeedPage  username={item.username} upvotes={item.upvotes} caption={item.caption} deletetime={item.deletetime} />}
                    keyExtractor={item => item._id}
                    />                
                </View>
            )}
            {!showImage && (
                <ScrollView style={{ marginTop: 20 }}>
                    {matrix.map(column => (
                        <View key={column[0]._id} style={{ flex: 1, justifyContent: 'space-evenly', margin: 15, flexDirection: 'row' }}>
                            {column.map(row => 
                            <TouchableOpacity
                                key={row._id}
                                onPress={() => {setShowImage(true); setImageData({username: row.username, upvotes: row.upvotes, caption: row.caption, deletetime: row.deletetime, _id: row._id})}}
                                onLongPress={() => {setShowSaveImageDialog(true);}}
                            >
                                <Image style={{ height: 150, width: 150 }} source={require("../components/animegirl2.jpg")} />
                            </TouchableOpacity>
                            
                            )}
                        </View>
                    ))}
                </ScrollView>
            )}
            
        </View>
    );
}
export default ProfilePage;
