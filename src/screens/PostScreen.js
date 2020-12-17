import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Button, Input, Icon } from "react-native-elements";
import { AntDesign, Entypo, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import HeaderHome from "./../components/HeaderHome";
import CommentCard from "./../components/CommentCard"
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";


const PostScreen = (props) => {
  //console.log(props);

  //const likecount =props.route.params.likecount
  const [CurDate, setCurDate] = useState("");
  const [LikeCount, setLikeCount] = useState(0);
  const [LikersList, setLikersList] = useState([]);
  const [NewComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);
    firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.postID)
        .onSnapshot((querySnapShot) => {
            setIsLoading(false);
            setCommentList(querySnapShot.data().comments);
            let commentCount = commentList.length ;
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
      .doc(props.route.params.authorID)
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
   var date= new Date().getDate();
   var month= new Date().getMonth()+1;
   var year= new Date().getFullYear();
   setCurDate(date+'/'+month+'/'+year);
   
    //let postReaction = await getDataJSON(post.name+"Reaction")
      //setPostCommentInfo(postReaction)
   loadComments();
   loadNotifications();
  },[]);
    let likeCount = LikersList.length
    let likeButton = " ";
    likeButton = " Like(".concat(likeCount).concat(")");
    
    let commentCount = commentList.length
    let commentButton = " ";
    commentButton = " Comments (".concat(commentCount).concat(")");

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
           <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Button
          type="solid"
          title="Go Back"
          titleStyle={styles.buttonStyle}
          buttonStyle={{alignSelf:"flex-start", marginLeft:0,paddingRight:330, backgroundColor:"black"}}
          icon={<MaterialIcons name="arrow-back" size={28} color="white" />}
          iconContainerStyle ={{alignSelf:"auto"}}
          onPress={
            function(){
              props.navigation.navigate("HomeTab");
            }} 
          />
          
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
             containerStyle={{ backgroundColor: "#F7E5FF" }}
             rounded
             icon={{ name: "user", type: "font-awesome", color: "black"}} 
             activeOpacity={1}
             />
              <Text h4Style={{ padding: 10 }} h4>{props.route.params.name}</Text>
            </View>
            <Text style={{ fontStyle: "italic" }}>  posted on {props.route.params.date}</Text>
            <Card.Divider />
            <Text style={{ paddingVertical: 10, }}> {props.route.params.post}</Text>
          <Card.Divider />
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent: "space-between"}}>
           
            <Button
               title= { likeButton}
               type="outline"
               titleStyle = {styles.button2Style}
               icon={<AntDesign name={"like1"} size={24} color="#873FB2" />}
            />
            <Button
               title= { commentButton}
               type="outline"
               titleStyle = {styles.button2Style}
               icon={<FontAwesome name={"comments"} size={24} color="#873FB2" />}
          />
            </View>            
          </Card>     
          </Card>     
          <Card>
      <Input 
        multiline
        placeholder="Write Something"
        leftIcon={<Entypo name="pencil" size={24} color="black" />}
        onChangeText ={function(val){
          setNewComment(val);
      }}
      />
      <Button title="Comment" titleStyle={styles.button2Style}
       type="outline"
       onPress={
        async function(){
          setIsLoading(true);
             firebase
            .firestore()
            .collection('posts')
            .doc(props.route.params.postID)
            .set(
              {
                   comments: [...commentList,
                    {
                    comment: NewComment,
                    commented_by: auth.CurrentUser.displayName,
                    commenting_date: CurDate
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
              if (props.route.params.authorID != auth.CurrentUser.uid) {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(props.route.params.authorID)
                    .set(
                        {  notifications: [...notificationList,
                          {

                            type: "comment",
                            notification_from: auth.CurrentUser.displayName,
                            notified_at: firebase.firestore.Timestamp.now().toString(),
                            posting_date: props.route.params.date,
                            post: props.route.params.post,
                            postID: props.route.params.postID,
                            authorID: props.route.params.authorID,
                            name: props.route.params.name,
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
                  
       } } >
       </Button>
       </Card>
       <FlatList
      data ={commentList}
      renderItem ={ function({item}){
        return(
          <CommentCard
          name={item.commented_by}
          date={item.commenting_date}
          comment={item.comment}
              
          />
         )}}
       /> 
          
       </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    backgroundColor:"#eae5ff",
    flex: 1,
  },
  buttonStyle:{
    color: "white",
    fontSize:14,
    fontWeight:"100",
    marginLeft:10,

},
button2Style:{
  color: "#4169E1",
  fontSize:16,
  fontWeight:"100",
}

});

export default PostScreen;