import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const CommentCard = (props) => {
  //const comment=props.comments
  //const currentUser=props.currentUser

  
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight:"bold"}} >{props.name}
        </Text>
        <Text style={{ fontStyle: "italic" }}> ({ props.date})
        </Text>
       </View>  
      <Text style={{ paddingVertical: 10, marginLeft:10, }}>{props.comment}
      </Text>
      
    </Card>
  );
};
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

export default CommentCard;