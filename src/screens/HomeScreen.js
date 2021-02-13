import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList,  ActivityIndicator } from "react-native";
import { Card, Button, Text, SearchBar, Input , Image} from "react-native-elements";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import BookCard from "./../components/BookCard";
import HeaderHome from "../components/HeaderHome";
import * as firebase from "firebase";
import "firebase/firestore";


const HomeScreen = (props) => {
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const loadBooks = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("Books")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setBooks(temp_posts);
        console.log(books)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {

    loadBooks();
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
    <View style={styles.searchStyle}>
     <SearchBar
        placeholder="Search Books"
        onChangeText = {setSearch}
        value={search}
        lightTheme
      />
      </View>
    <ActivityIndicator size="large" color="blue" animating={loading} /> 
    <FlatList
      data ={books}
      renderItem ={ function({item}){
        return(
          <BookCard
          title={item.data.title}
          author= {item.data.author}
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
        backgroundColor:"#eae5ff"
      },
      buttonStyle :{
        backgroundColor: "#98A1DF"
      },
      button2Style:{
        color: "white"
        
    },
    searchStyle:{
      padding:30,
  
    },
    imgStyle: {
      width: 100,
      height: 150,
      alignSelf:'flex-end'
  },

});

export default HomeScreen;

