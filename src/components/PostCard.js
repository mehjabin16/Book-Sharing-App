import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { storeDataJSON, getDataJSON } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";


const PostCard = (props) => {
 
  const [Icon, setIcon]=useState("like2");
  const [LikeCount, setLikeCount] = useState(0);
  const [PostReactions, setPostReactions] = useState([]);
  const [Liked, setLiked] = useState([]);
  const [CommentCount, setCommentCount] = useState(0);
 
  const navigation = useNavigation();
  
  useEffect(() =>{
    
    const getData = async()=>
    { 
      //let postReaction = await getDataJSON(posts.name+"Reaction")
      //setPostLikeInfo(postReaction)
    let postReaction = await getDataJSON(posts.Email+"Reaction")
    let likes =[]
    likes = await getDataJSON(posts.key+'Like');
    let len = likes.length
    if(likes != null ){
      setLiked(likes)
      setLikeCount(len+1)
     // setPostReactions(postReaction)
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
        <Text h4Style={{ padding: 10 }} h4>{props.author}</Text>
      </View>
      <Text style={{ fontStyle: "italic" }}>  posted on {props.date}</Text>
      <Text style={{ paddingVertical: 10, }}>
        {props.body}
      </Text>
      <Card.Divider />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title={LikeCount}
          type="outline"
          titleStyle = {styles.button2Style}
          icon={<AntDesign name={Icon} size={24} color="#873FB2" />}
          onPress={ function()  {
            let likes = LikeCount+1;
            setLikeCount(likes);
            console.log(LikeCount);
            setIcon("like1");
           
            
          }
          }
        />

        <Button type="solid" 
           buttonStyle ={styles.buttonStyle}
           title="Comment" 
           onPress={ function()  {}} 
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