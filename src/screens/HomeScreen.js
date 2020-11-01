import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {AuthContext, AuthProvider} from "../provider/AuthProvider";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import { storeDataJSON } from "../functions/AsyncFunctions";
import { getDataJSON } from "../functions/AsyncFunctions";
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";

const HomeScreen = (props) => {
  const [Des, setDes] = useState("");
  const [test, setTest] = useState("");
  const [curDate, setCurDate] = useState("");
 
  useEffect(() =>{
   var date= new Date().getDate();
   var month= new Date().getMonth()+1;
   var year= new Date().getFullYear();
  setCurDate(date+'/'+month+'/'+year);
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
          setDes(val);
      }}
      clearButtonMode='always'  
      
      />
      <Button title="Post" titleStyle={styles.button2Style}
       type="outline" onPress={
            async function(){
            let post ={
              des:Des                      
              };
          storeDataJSON("key", post);
          let Test =await getDataJSON("key");              
          setTest(Test.des)
          console.log(post) 
            }} 
         />
    </Card>    
          <PostCard
            author={auth.CurrentUser.name}
            title= {curDate}
            body= {test}
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
      },
      button2Style:{
        color: "#873FB2"
        
    },

});

export default HomeScreen;

