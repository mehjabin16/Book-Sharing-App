import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const CommentCard = (props) => {
  const comment=props.comments
  const currentUser=props.currentUser

  
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight:"bold"}} >{comment.name}
        </Text>
        <Text style={{ fontStyle: "italic" }}>({comment.date})
        </Text>
       </View>  
      <Text style={{ paddingVertical: 10, marginLeft:10, }}>{comment.commentbody}
      </Text>
      
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

export default CommentCard;