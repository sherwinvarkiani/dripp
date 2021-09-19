import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInput, Card, Subheading, List } from 'react-native-paper';

import ImageBin from '../components/ImageBin';

const FeedPage = ({ data }) => {
    // console.log(data.item);

    // return <></>;

    const { user_id, img, expires, likes, dislikes, comments: dataComments, caption } = data.item;
    // console.log("FEED PAGE");
    // console.log(_id, user_id, expires, likes, dislikes, dataComments, hastags);
    // console.log(!img || !expires || (!likes && likes !== 0) || (!dislikes && dislikes !== 0) || !dataComments);

    if (!img || !expires || (!likes && likes !== 0) || (!dislikes && dislikes !== 0) || !dataComments || !expires) return <></>;
    // console.log("HAHAHA");

    let sec = (new Date(expires).getTime() - new Date().getTime()) / 1000
    // if (sec < 0) return <></>;
    const hour = Math.floor(sec / 3600);
    const min = Math.floor(sec % 3600 / 60);
    sec = Math.floor(sec - hour * 3600 - min * 60);

    // Get images from backend somehow
    const [votes, setVotes] = useState(likes - dislikes);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([caption, ...dataComments.filter(c => c)]);
    const [showComments, setShowComments] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(hour.toString() + ":" + min.toString() + ":" + sec.toString());
    const upColor = "#3530d9";
    const downColor = "#d6d4fa";

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
    }, [timeRemaining])

    const upvote = () => {
        if (downvoted) {
            setDownvoted(false);

            setVotes(likes - dislikes + 1);
        } else {
            setVotes(votes + (!upvoted ? 1 : -1));
        }
        setUpvoted(!upvoted);
    };

    const downvote = () => {
        if (upvoted) {
            setUpvoted(false);

            setVotes(likes - dislikes - 1);
        } else {
            setVotes(votes + (!downvoted ? -1 : 1));
        }
        setDownvoted(!downvoted);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: "100%" }}>
            {showComments && (
                <View
                    style={{ width: '100%', height: '60%', position: 'absolute', top: '40%', backgroundColor: "#DDDDDD", zIndex: 1, flex: 1, flexDirection: 'column' }}
                >
                    <ScrollView style={{ flex: 1 }} nestedScrollEnabled>
                        {/* <List.Section>
                            {comments.map(message => <List.Item><Text>{message}</Text></List.Item>)}
                        </List.Section> */}
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
                <>
                    <View
                        style={{ position: 'absolute', bottom: 40, left: 30, zIndex: 1, width: "60%" }}
                    >
                        <Card mode="outlined" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 5, bottom: 10 }}>
                            <Subheading numberOfLines={2} style={{ color: "white" }}>
                                {caption}
                            </Subheading>
                        </Card>
                    </View>
                    <View style={{ position: 'absolute', bottom: 120, right: 30, zIndex: 1 }}>
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

                        <Card mode="outlined" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", margin: 10 }}>
                            <Subheading style={{ alignSelf: 'center', padding: 2, color: 'white' }}>{votes > 1000000 ? (votes / 1000000).toFixed(1) + "M" : (votes > 1000 ? (votes / 1000).toFixed(1) + "K" : votes)}</Subheading>
                        </Card>

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
                </>
            )}
            <View style={{ position: 'absolute', bottom: 40, right: 30, zIndex: 1 }}>
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end' }}
                    onPress={() => { setShowComments(!showComments); }}
                    disabled={timeRemaining == "00:00:00"}
                >
                    <Icon
                        reverse
                        name="comments-o"
                        type="font-awesome"
                    />
                </TouchableOpacity>
            </View>

            <ImageBin img={img} />
            <View style={{ position: 'absolute', top: 40, right: 30 }}>
                <Card mode="outlined" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 5, bottom: 10 }}>
                    <Subheading style={{ color: timeRemaining.split(":")[0] === "00" && timeRemaining.split(":")[1] === "00" ? "red" : "white" }}>{timeRemaining}</Subheading>
                </Card>
            </View>
        </View>
    );
}

export default FeedPage;
