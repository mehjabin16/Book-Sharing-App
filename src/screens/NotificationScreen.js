import React, {useState, useEffect} from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import NotificationCard from "./../components/NotificationCard";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";


const NotificationScreen = (props) => {
  //const [LikeList, setLikeList] = useState([]);
  const [PostReactions, setPostReactions] = useState([]);
  
  
  useEffect(() =>{
   
    const getData = async()=>
    {
      let reactionList=await getDataJSON(props.currentUser.name+"Reaction")
        if(reactionList !=null){
        setPostReactions(reactionList)
        
        }
      
    }
    getData();
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

      data ={PostReactions}
      renderItem ={ function({item}){
        return(
          <NotificationCard
          currentUser = {auth.CurrentUser}
          notifications ={item}  
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