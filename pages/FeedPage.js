import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import UserImage from '../components/UserImage';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      marginTop: 10
    },
  });

const FeedPage = (props) => {
    // Get images from backend somehow
    var img = "../components/animegirl2.jpg";
    const [votes, setVotes] = useState(props.upvotes);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const upvote = () => {
        if (downvoted) {
            setDownvoted(false);
            
            setVotes(props.upvotes + 1);
        } else {
            setVotes(votes + (!upvoted ? 1 : -1));
        }
        setUpvoted(!upvoted);
    };

    const downvote = () => {
        if (upvoted) {
            setUpvoted(false);

            setVotes(props.upvotes - 1);
        } else {
            setVotes(votes + (!downvoted ? -1 : 1));
        }
        setDownvoted(!downvoted);
        
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
                style={{ backgroundColor: "#DDDDDD", position: 'absolute', top: '70%', zIndex: 1, left: '5%' }}
            >
                <Text>
                    {props.caption}
                </Text>
            </View>
            
            <View style={{ position: 'absolute', left: "70%", top: "50%", zIndex: 1, justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    onPress={upvote}
                    style={styles.button}
                >
                    <Text>UP</Text>
                </TouchableOpacity>

                <Text style={{ alignSelf: 'center', marginTop: 10, backgroundColor: "#DDDDDD", padding: 10 }}>{votes}</Text>

                <TouchableOpacity
                    onPress={downvote}
                    style={styles.button}
                >
                    <Text>DOWN</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text>COMMENTS</Text>
                </TouchableOpacity>
            </View>
            <UserImage source={require(img)}/>
            <View style={{ position: 'absolute', left: "5%", top: "5%", backgroundColor: "#DDDDDD" }}>
                <Text>{props.username}</Text>
            </View>
            <View style={{ position: 'absolute', left: "75%", top: "5%", backgroundColor: "#DDDDDD" }}>
                <Text>{props.deletetime}</Text>
            </View>
            
        </View>
    );
}
export default FeedPage;