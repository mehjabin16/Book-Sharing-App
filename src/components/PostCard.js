import React, {useState, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
            setCommentList(querySnapShot.data().comments)
            let commentCount = CommentList.length ;
            setCommentCount(commentCount);
            setLikersList(querySnapShot.data().likers);
            let likeCount = LikersList.length;
            setLikeCount(likeCount) ;
        })
        .catch((error) => {
            setIsLoading(false);
            alert(error);
        })
}

const loadNotifications = async () => {
  setIsLoading(true);
  firebase
      .firestore()
      .collection('users')
      .doc(props.authorID)
      .onSnapshot((querySnapShot) => {
          setIsLoading(false);
          setNotificationList(querySnapShot.data().notifications);
      })
      .catch((error) => {
          setIsLoading(false);
          alert(error);
      })
}
  
  useEffect(() =>{
    loadNotifications();
    LoadData();
   },[]);
   let likeCount = LikersList.length
   let likeButton = " ";
    likeButton = " Likes (".concat(likeCount).concat(")");
  
   let commentCount = CommentList.length
   let commentButton = " ";
   commentButton = " Comments (".concat(commentCount).concat(")");


  return (
    <AuthContext.Consumer>
    {(auth) => (
    <TouchableOpacity onPress={
      function(){
        
        if (auth.CurrentUser.uid==props.authorID){
          Alert.alert(
            'Delete Post',
            'Are you sure to delete this post?',
            [
              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: function(){
                firebase
                  .firestore()
                  .collection('posts')
                  .doc(props.postID)
                  .delete()
                  .then(function() {
                   alert("Document successfully deleted!");
                  })
                  .catch(function(error) {
                  console.error("Error removing document: ", error);
                  })
              } },
            ]
          );
          
      }
    }
  }
    >
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
          icon={<AntDesign name={Icon} size={24} color="#98A1DF" />}
          onPress={ function()  {
            //let likes = LikeCount+1;  
            //console.log(LikeCount);
            setIcon("like1");
            firebase
              .firestore()
              .collection('posts')
              .doc(props.postID)
              .set(
               {
                 likers: [...LikersList, auth.CurrentUser.uid],
                 //likes: likes
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
                if (props.authorID != auth.CurrentUser.uid) {
                  firebase
                      .firestore()
                      .collection('users')
                      .doc(props.authorID)
                      .set(
                          {  notifications: [...notificationList,
                            {

                              type: "like",
                              notification_from: auth.CurrentUser.displayName,
                              notified_at: firebase.firestore.Timestamp.now().toString(),
                              posting_date: props.date,
                              post: props.body,
                              postID: props.postID,
                              authorID: props.authorID,
                              name: props.author,
                            }]
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
      }
        />

        <Button type="solid" 
           buttonStyle ={styles.buttonStyle}
           title={commentButton} 
           onPress={ ()=>
          
            navigation.navigate('Post',{
            name: props.author,
            post: props.body,
            date: props.date,
            authorID: props.authorID,
            postID: props.postID,
            //likecount : LikeCount
           })} 
           >

           </Button>
           
      </View>
    </Card>
    </TouchableOpacity>
   )}
   </AuthContext.Consumer>
)

}
const styles = StyleSheet.create({
  buttonStyle:{
      backgroundColor: "#98A1DF"
      
  },
  button2Style:{
      color: "#98A1DF"
      
  },
  iconStyle:{
    backgroundColor: "#FFB7B2"
    
},


});

export default PostCard;