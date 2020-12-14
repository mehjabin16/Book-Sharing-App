import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { storeDataJSON, getDataJSON } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";

import { AuthContext } from "../provider/AuthProvider";


const PostCard = (props) => {
  
  const [Icon, setIcon]=useState("like2");
  const [LikeCount, setLikeCount] = useState(0);
  const [PostReactions, setPostReactions] = useState([]);
  const [LikersList, setLikersList] = useState([]);
  const [CommentList, setCommentList] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
 
  const navigation = useNavigation();
  const LoadData = async () => {
    setIsLoading(true);
    firebase
        .firestore()
        .collection('posts')
        .doc(props.postID)
        .onSnapshot((querySnapShot) => {
            setIsLoading(false);
            //setCommentList(querySnapShot.data().comments);
            let likers =[]
            likers = querySnapShot.data().likers;
            let len = likers.length
            setLikersList(querySnapShot.data().likers);
            setLikeCount(len+1)
            
            //setLikeStatus(querySnapShot.data().likers.includes(props.userID));
        })
        .catch((error) => {
            setIsLoading(false);
            alert(error);
        })
}
  
  useEffect(() =>{
    
    LoadData();
   },[]);

   let likeButton = " ";
    likeButton = " Likes (".concat(LikeCount).concat(")");

  return (
    <AuthContext.Consumer>
    {(auth) => (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#F7E5FF" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }} 
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4> {props.author}</Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> posted on {props.date}</Text>
      <Text style={{ paddingVertical: 10, }}>
        {props.body}
      </Text>
      <Card.Divider />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title= { likeButton}
          type="outline"
          titleStyle = {styles.button2Style}
          icon={<AntDesign name={Icon} size={24} color="#873FB2" />}
          onPress={ function()  {
            let likes = LikeCount+1;  
            //console.log(LikeCount);
            setIcon("like1");
            //console.log(props);
            firebase
              .firestore()
              .collection('posts')
              .doc(props.postID)
              .set(
               {
                 likers: [...LikersList, auth.CurrentUser.uid],
                 likes: likes
               },
               { merge: true }
               )
              .then(() => {
                    setIsLoading(false);
               })
               .catch((error) => {
                     setIsLoading(false);
                     alert(error);
                })
                
          }
          }
        />

        <Button type="solid" 
           buttonStyle ={styles.buttonStyle}
           title="Comment" 
           onPress={ ()=>navigation.navigate('Post',{
            name: props.author,
            post: props.body,
            date: props.date,
            authorID: props.authorID,
            postID: props.postID,
            likecount : LikeCount
           })} 
           >

           </Button>
           
      </View>
    </Card>
   )}
   </AuthContext.Consumer>
)

}
const styles = StyleSheet.create({
  buttonStyle:{
      backgroundColor: "#873FB2"
      
  },
  button2Style:{
      color: "#873FB2"
      
  },
  iconStyle:{
    backgroundColor: "#FFB7B2"
    
},


});

export default PostCard;