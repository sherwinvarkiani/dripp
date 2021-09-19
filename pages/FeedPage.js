import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import UserImage from '../components/UserImage';
import { Subheading } from 'react-native-paper';

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
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(props.deletetime);
    const redColor = "#fc0328";

    // useEffect(() => {
    //     if (votes == 432) {
    //     var arr = timeRemaining.split(":");
    //     var time = arr[0] * 3600 + arr[1] * 60 + arr[2];
    //     time -= 1;
    //     var date = new Date(time * 1000);
    //     var newTime = date.toUTCString().split(" ")[4];
        
    //     const timer = setTimeout(() => {
    //         setTimeRemaining(newTime);
    //     }, 1000);
    // }
    // })

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
            {showComments && (
                <View
                    style={{ width: '100%', height: '60%', position: 'absolute', top: '40%', backgroundColor: "#DDDDDD", zIndex: 1, flex: 1, flexDirection: 'column'}}
                >
                    <ScrollView style={{ flex: 1 }}>
                    </ScrollView>
                    <TextInput
                        style={{ flex: 1 }}
                        label="Comment"
                        value={comment}
                        onChangeText={comment => setComment(comment)}
                    />
                </View>
            )}
            {!showComments && (
                <View
                    style={{ position: 'absolute', top: '80%', zIndex: 1, left: '5%' }}
                >
                    <Subheading style={{ color: "white", bottom: 10 }}>
                        {props.caption}
                    </Subheading>
                </View>
            )}
            
            {!showComments && (
                <View style={{ position: 'absolute', left: "75%", top: "50%", zIndex: 1, justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        onPress={upvote}
                        style={{ alignSelf: 'flex-end' }}
                    >
                        <Icon
                            reverse
                            name="arrow-bold-up"
                            color={upvoted ? redColor : NaN}
                            type="entypo"
                        />
                    </TouchableOpacity>

                    <Subheading style={{ alignSelf: 'center', padding: 10, color: 'white' }}>{votes > 1000000 ? (votes / 1000000).toFixed(1) + "M" : votes}</Subheading>

                    <TouchableOpacity
                        onPress={downvote}
                        style={{ alignSelf: 'flex-end' }}
                    >
                        <Icon
                            reverse
                            name="arrow-bold-down"
                            color={downvoted ? redColor : NaN}
                            type="entypo"
                        />
                    </TouchableOpacity>
                </View>
            )}
            <View style={{ position: 'absolute', left: "75%", top: "72%", zIndex: 1, justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end' }}
                    onPress={() => {setShowComments(!showComments);}}
                >
                    <Icon
                        reverse
                        name="comments-o"
                        type="font-awesome"
                    />
                </TouchableOpacity>
            </View>
            
            <UserImage source={require(img)}/>
            <View style={{ position: 'absolute', left: "5%", top: "5%"}}>
                <Subheading style={{ color: "white" }}>@{props.username}</Subheading>
            </View>
            <View style={{ position: 'absolute', left: "75%", top: "5%" }}>
                <Subheading style={{ color: "white" }}>{timeRemaining}</Subheading>
            </View>
            
        </View>
    );
}
export default FeedPage;