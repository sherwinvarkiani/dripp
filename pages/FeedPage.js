import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import UserImage from '../components/UserImage';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


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
            <View style={{ position: 'absolute', left: "80%", top: "65%", zIndex: 1 }}>
                <Button
                    icon={
                        <Icon
                        name="arrow-up"
                        size={15}
                        color="white"
                        />
                    }
                    title="UP"
                    onPress={upvote}
                />
                <Text>{votes}</Text>
                <Button
                    icon={
                        <Icon
                        name="arrow-down"
                        size={15}
                        color="white"
                        />
                    }
                    title="DOWN"
                    onPress={downvote}
                    style={{position: 'absolute', left: 0}}
                />
            </View>
            <UserImage source={require(img)}/>
            <View style={{ position: 'absolute', left: "5%", top: "5%" }}>
                <Text>sherlose</Text>
            </View>
            
        </View>
    );
}
export default FeedPage;