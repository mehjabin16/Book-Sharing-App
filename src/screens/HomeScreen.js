import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
<<<<<<< HEAD

=======
import { } from "../functions/AsyncFunctions";
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7


const HomeScreen = (props) => {
  const [curDate, setCurDate] = useState("");
  const [Postbody, setPostbody] = useState("");
  const [Postcards, setPostcards] = useState([]);
 
  useEffect(() =>{
   var date= new Date().getDate();
   var month= new Date().getMonth()+1;
   var year= new Date().getFullYear();
   setCurDate(date+'/'+month+'/'+year);
   const getData = async()=>
   {
     setPostcards(await getDataJSON('posts'));
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
          setPostbody(val);
<<<<<<< HEAD
=======
  
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
      }}
     
      />
      <Button title="Post" titleStyle={styles.button2Style}
       type="outline" onPress={
            async function(){
              if(Postcards !=null){
                setPostcards(posts => [
                  ...posts,
                  {
                    name: auth.CurrentUser.name,
                    date: curDate,
                    postbody: Postbody,
                    key : Postbody,
                  },
                ]);
              }
              else{
                const array = [];
                array.push({
                    name: auth.CurrentUser.name,
                    date: curDate,
                    postbody: Postbody,
                    key : Postbody,
                });
                setPostcards(array)
              }
              await storeDataJSON('posts', Postcards);
           } }
         />
<<<<<<< HEAD
         
=======
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
    </Card>  
    <FlatList
      data ={Postcards}
      renderItem ={ postitem =>{
        return(
          <PostCard
<<<<<<< HEAD
          author={postitem.item.name}
          date= {postitem.item.date}
          body= {postitem.item.postbody}
=======
            author={postitem.item.name}
            date= {postitem.item.date}
            body= {postitem.item.postbody}
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
           
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
      },
      button2Style:{
        color: "#873FB2"
        
    },

});

export default HomeScreen;

