import React, {useState} from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import { useNavigation } from '@react-navigation/native';

const NotificationCard = (props) => {
 const reactiontype =props.type;
  const navigation = useNavigation();

  let reaction = " ";
  if (reactiontype=="like"){
  reaction = "liked";
  }
  else if (reactiontype =="comment") {
    reaction = "commented";
  }
 
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
         
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" ,padding:6}}>
              <Avatar
                containerStyle={{ backgroundColor: "#F6EBF9" }}
                
                icon={{
                  name: "commenting",
                  type: "font-awesome",
                  color: "black",
                  size:20
                }}
                activeOpacity={1}
                onPress ={
                  function(){
                    ()=>navigation.navigate('Post' ,{
                      author: props.name,
                      //post: props.body,
                      date: props.date,
                      authorID: props.authorID,
                      postID: props.postID,
                     } );
                  }
                }
              />
               <Text >  {props.notificationFrom} </Text>
                
                <Text >{reaction} your post</Text>
            </View>
          </Card>
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