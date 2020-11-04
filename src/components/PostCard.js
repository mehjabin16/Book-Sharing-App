import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { storeDataJSON, getDataJSON } from "../functions/AsyncFunctions";


const PostCard = (props) => {
  const posts=props.posts
  const currentUser=props.currentUser
  const [Icon, setIcon]=useState("like2");
  const [LikeCount, setLikeCount] = useState(0);
  const [PostLikeInfo, setPostLikeInfo] = useState([]);
  const [Liked, setLiked] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);
 
  const navigation = useNavigation();
  
  useEffect(() =>{
    
    const getData = async()=>
    { 
      //let postReaction = await getDataJSON(posts.name+"Reaction")
      //setPostLikeInfo(postReaction)
      let likes =[]
    likes = await getDataJSON(posts.key+'Like');
    let len = likes.length
    if(likes != null ){
      setLiked(likes)
      setLikeCount(len+1)
      console.log(LikeCount)  
    }
             
    }
    getData();
   },[]);

  return (
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
        <Text h4Style={{ padding: 10 }} h4>{posts.name}</Text>
      </View>
      <Text style={{ fontStyle: "italic" }}>  posted on {posts.date}</Text>
      <Text style={{ paddingVertical: 10, }}>
        {posts.postbody}
      </Text>
      <Card.Divider />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title={LikeCount}
          type="outline"
          titleStyle = {styles.button2Style}
          icon={<AntDesign name={Icon} size={24} color="#873FB2" />}
          onPress={
            function(){
                 let likes = LikeCount+1;
                 setLikeCount(likes);
                 console.log(LikeCount);
                 setIcon("like1")

                 let likedusers ={
                   postid: posts.key,
                   reactor: currentUser.name,
                   author: posts.name,
                 }
                 let userlist = Liked.copyWithin()
                 userlist.push(likedusers ) 
                 setLiked(userlist)
             storeDataJSON(posts.key+'Like', Liked);
             console.log(Liked);
                 
            }
          }
        />

        <Button type="solid" 
           buttonStyle ={styles.buttonStyle}
           title="Comment" 
           onPress={ ()=>navigation.navigate('Post',{posts, currentUser, LikeCount})} 
           >

           </Button>
           
      </View>
    </Card>
  );
};
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