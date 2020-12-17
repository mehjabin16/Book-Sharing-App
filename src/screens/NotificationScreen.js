import React, {useState, useEffect} from "react";
import { View, StyleSheet, Button,FlatList } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import NotificationCard from "./../components/NotificationCard";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";


const NotificationScreen = (props) => {
  console.log(props.currentUser.uid);
  const [isLoading, setIsLoading] = useState(false);
  const [NotificationList, setNotificationList] = useState([]);
  
  const loadNotificationData = async () => {

    setIsLoading(true);
    firebase
        .firestore()
        .collection('users')
        .doc(props.currentUser.uid)
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
   
    loadNotificationData();
   },[]);

  return (
    <AuthContext.Consumer>
   {(auth)=>(
    <View style={styles.viewStyle}>
    <HeaderHome
      DrawerFunction={() => {
        props.navigation.toggleDrawer();
      }}
    />
    
    <FlatList

      data ={NotificationList}
      renderItem ={ function({item}){
        return(
          <NotificationCard
          name={item.name}
          date={item.posting_date}
          post={item.post}
          postID={item.postID}
          authorID={item.authorID}
          notificationFrom={item.notification_from}
          type={item.type}

          />
      )}}
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

export default NotificationScreen;