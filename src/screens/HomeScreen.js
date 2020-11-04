import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import PostScreen from "./PostScreen";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";


const HomeScreen = (props) => {
  const [curDate, setCurDate] = useState("");
  const [NewPost, setNewPost] = useState("");
  const [PostList, setPostlist] = useState([]);
 
  useEffect(() =>{
   var date= new Date().getDate();
   var month= new Date().getMonth()+1;
   var year= new Date().getFullYear();
   setCurDate(date+'/'+month+'/'+year);
   const getData = async()=>
   {
     const posts= await getDataJSON('Post');
     if(posts != null ){
       setPostlist(posts)
     }
     
   }
   getData();
  },[]);

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
             function(){
              var RandomNumber = Math.floor(Math.random() * 100) + 1;
              const Pid = RandomNumber.toString();
             
                 let postInfo = {
                    name: auth.CurrentUser.name,
                    date: curDate,
                    postbody: NewPost,
                    key : Pid,
                  }
                  let postList = PostList.copyWithin()
                  postList.push(postInfo) 
                  setPostlist(postList)
           
              storeDataJSON('Post', PostList);
              console.log(PostList);
             
           } }
         />
         
    </Card>  
    <FlatList
      data ={PostList}
      renderItem ={ function({item}){
        return(
          <PostCard
          currentUser = {auth.CurrentUser}
          posts ={item}  
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

