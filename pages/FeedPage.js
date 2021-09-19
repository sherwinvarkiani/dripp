import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import UserImage from '../components/UserImage';
import { Subheading } from 'react-native-paper';

const FeedPage = (props) => {
    // Get images from backend somehow
    var img = "../components/animegirl2.jpg";
    const [votes, setVotes] = useState(props.upvotes);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(props.deletetime);
    const upColor = "#3530d9";
    const downColor = "#d6d4fa";

    const [comments, setComments] = useState(["@" + props.username + ": " + props.caption, "Looking good!", "Love the look", "Where did you buy the fit?", "SHEEEEEESH"]);

    useEffect(() => {
        var arr = timeRemaining.split(":");
        var time = parseInt(arr[0]) * 3600 + parseInt(arr[1]) * 60 + parseInt(arr[2]);
        if (time != 0) {
            time = time - 1;
        }
        var date = new Date(null);
        date.setSeconds(time);
        var newTime = date.toISOString().substr(11, 8);
        
        const timer = setTimeout(() => {
            setTimeRemaining(newTime);
        }, 1000);
    })

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

    // console.log(comments);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {showComments && (
                <View
                    style={{ width: '100%', height: '60%', position: 'absolute', top: '40%', backgroundColor: "#DDDDDD", zIndex: 1, flex: 1, flexDirection: 'column'}}
                >
                    <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
                        {comments.map(message => {
                            return (
                                <View key={message} style={{ margin: 5, padding: 5, borderColor: 'black', 'borderWidth': 2, zIndex: 2 }}>
                                    <Text>{message}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <TextInput
                        style={{ flex: 1 }}
                        label="Comment"
                        value={comment}
                        onChangeText={comment => setComment(comment)}
                        onSubmitEditing={comment => {
                            setComments(comments => [...comments, comment.nativeEvent.text])
                        }}
                    />
                </View>
            )}
            {!showComments && (
                <View
                    style={{ position: 'absolute', top: '75%', zIndex: 1, left: '5%', width: "80%" }}
                >
                    <Subheading numberOfLines={2} style={{ color: "white", bottom: 10 }}>
                        {props.caption}
                    </Subheading>
                </View>
            )}
            
            {!showComments && (
                <View style={{ position: 'absolute', left: "75%", top: "50%", zIndex: 1, justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        onPress={upvote}
                        style={{ alignSelf: 'flex-end' }}
                        disabled={timeRemaining == "00:00:00"}
                    >
                        <Icon
                            reverse
                            name="arrow-bold-up"
                            color={upvoted ? upColor : NaN}
                            type="entypo"
                        />
                    </TouchableOpacity>

                    <Subheading style={{ alignSelf: 'center', padding: 10, color: 'white' }}>{votes > 1000000 ? (votes / 1000000).toFixed(1) + "M" : (votes > 1000 ? (votes / 1000).toFixed(1) + "K" : votes)}</Subheading>

                    <TouchableOpacity
                        onPress={downvote}
                        style={{ alignSelf: 'flex-end' }}
                        disabled={timeRemaining == "00:00:00"}
                    >
                        <Icon
                            reverse
                            name="arrow-bold-down"
                            color={downvoted ? downColor : NaN}
                            type="entypo"
                        />
                    </TouchableOpacity>
                </View>
            )}
            <View style={{ position: 'absolute', left: "75%", top: "72%", zIndex: 1, justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end' }}
                    onPress={() => {setShowComments(!showComments);}}
                    disabled={timeRemaining == "00:00:00"}
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
                <Subheading style={{ color: timeRemaining.split(":")[0] === "00" && timeRemaining.split(":")[1] === "00" ? "red" : "white" }}>{timeRemaining}</Subheading>
            </View>
            
        </View>
    );
}
export default FeedPage;