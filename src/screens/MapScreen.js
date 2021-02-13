import React, {useState, useEffect} from "react";
import { View, StyleSheet, Button,FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "../components/HeaderHome";
import NotificationCard from "../components/NotificationCard";
import { AuthContext } from "../provider/AuthProvider";
import Map from "../components/Map";
import * as firebase from "firebase";
import "firebase/firestore";


const MapScreen = (props) => {
  
  return (
    <AuthContext.Consumer>
   {(auth)=>(
    <View style={styles.viewStyle}>
    <HeaderHome
      DrawerFunction={() => {
        props.navigation.toggleDrawer();
      }}
    /> 
     <SafeAreaView>
        <Map />
    </SafeAreaView>
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

export default MapScreen;