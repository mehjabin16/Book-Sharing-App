import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const PostCard = (props, onPress) => {
<<<<<<< HEAD
  const [LikeCount, setLikeCount] = useState(0);

=======
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
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
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> 
<<<<<<< HEAD
       posted on {props.date}
=======
      {props.date}
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
      </Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title= { LikeCount}
          titleStyle = {styles.button2Style}
          icon={<AntDesign name="like2" size={24} color="#873FB2" />}
          onPress={
            function(){
                 setLikeCount(LikeCount+1);
                 console.log(LikeCount);
            }
          }
        />
        <Button type="solid" 
           buttonStyle ={styles.buttonStyle}
           title="Comment (10)" 
            />
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