import React, {useState, useEffect} from "react";
import { View, StyleSheet, Button,FlatList } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import NotificationCard from "./../components/NotificationCard";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";


const InboxScreen = (props) => {
  //console.log(props.currentUser.uid);
  const [isLoading, setIsLoading] = useState(false);
  const [NotificationList, setNotificationList] = useState([]);
  
 

  return (
    <AuthContext.Consumer>
   {(auth)=>(
    <View style={styles.viewStyle}>
    <HeaderHome
      DrawerFunction={() => {
        props.navigation.toggleDrawer();
      }}
    />
    
    

  </View>
)}
    </AuthContext.Consumer>
);

}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
      },
      viewStyle: {
        flex: 1,
        backgroundColor:"white"
      },
      button2Style:{
        color: "#873FB2"
        
    },

});

export default InboxScreen;