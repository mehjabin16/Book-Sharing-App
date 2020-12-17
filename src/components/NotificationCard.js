import React, {useState} from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import { useNavigation } from '@react-navigation/native';

const NotificationCard = (props) => {
 const reactiontype =props.type;
  const navigation = useNavigation();

  let reaction = " ";
  let icon = '';
  if (reactiontype=="like"){
  reaction = "liked"
  icon = 'like';
  }
  else if (reactiontype =="comment") {
    reaction = "commented";
    icon = 'comment';
  }
 
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
         <TouchableOpacity 
         onPress ={
          function(){
              
              navigation.navigate('Post' ,{
              name: props.name,
              post: props.post,
              date: props.date,
              authorID: props.authorID,
              postID: props.postID,
             } );
          }
        }
         >
          <Card >
            <View style={{ flexDirection: "row", alignItems: "center" , backgroundColor: "#eae5ff"}}>
              <Avatar
                containerStyle={{ backgroundColor: "#F6EBF9", height:50, width:40}}
                
                icon={{
                  name: icon,
                  type: "evilicon",
                  color: "black",
                  size:24
                }}
                activeOpacity={1}
              />
               <Text >  {props.notificationFrom} </Text>
                
                <Text >{reaction} your post</Text>
            </View>
          </Card>
          </TouchableOpacity>
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
    flex: 1,
  },
});

export default NotificationCard;