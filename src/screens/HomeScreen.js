import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList,  ActivityIndicator } from "react-native";
import { Card, Button, Text, SearchBar, Input } from "react-native-elements";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import PostScreen from "./PostScreen";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";


const HomeScreen = (props) => {
  
  const [posts, setPosts] = useState("");
  const [curDate, setCurDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [newpost, setNewPost] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "asc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    var date= new Date().getDate();
    var month= new Date().getMonth()+1;
    var year= new Date().getFullYear();
    setCurDate(date+'/'+month+'/'+year);

    loadPosts();
  }, []);
 
  

return(
    <AuthContext.Consumer>
   {(auth)=>(
    <View style={styles.viewStyle}>
    <HeaderHome
      DrawerFunction={() => {
        props.navigation.toggleDrawer();
      }}
    />
     <SearchBar
        placeholder="Type Here..."
       
      />
      
    <ActivityIndicator size="large" color="blue" animating={loading} />
           
    

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
        backgroundColor:"#eae5ff"
      },
      buttonStyle :{
        backgroundColor: "#98A1DF"
      },
      button2Style:{
        color: "white"
        
    },

});

export default HomeScreen;

