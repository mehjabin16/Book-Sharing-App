import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList,  ActivityIndicator } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
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
      .orderBy("created_at", "desc")
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
    <Card>
      <Input 
        multiline
        placeholder="What's On Your Mind?"
        leftIcon={<Entypo name="pencil" size={24} color="black" />}
        onChangeText ={function(val){
          setNewPost(val);
      }}
     
      />
      <Button title="Post" titleStyle={styles.button2Style}
       type="outline" onPress={
        function () {
          setLoading(true);
          firebase
            .firestore()
            .collection("posts")
            .add({
              userId: auth.CurrentUser.uid,
              body: newpost,
              author: auth.CurrentUser.displayName,
              created_at: curDate,
              likes: [],
              comments: [],
            })
            .then(() => {
              setLoading(false);
              alert("Post created Successfully!");
            })
            .catch((error) => {
              setLoading(false);
              alert(error);
            });
        }}
         />
         <ActivityIndicator size="large" color="red" animating={loading} />
         
    </Card>  
    <FlatList
      data ={posts}
      renderItem ={ function({item}){
        return(
          <PostCard
          author={item.data.author}
          date={item.data.created_at}
          body={item.data.body}
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

export default HomeScreen;

