import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Card, Avatar, Icon } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View >
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <View style={{alignSelf:"center" , marginTop:40}}>
         <View>
         <Image source={require('./../../assets/nafisa.jpg')}
         style={styles.imgStyle}>
        </Image>
        </View>
        <View style={styles.addStyle}>
        <Icon
            rounded
            name='pluscircle'
            type='antdesign'
            color='gray'
            size={44}
            onPress={() => console.log('hello')} />
        </View>
        </View>
        
        <View style={styles.deleteStyle}>
        <Icon
            name='delete'
            type='antdesign'
            color='red'
            size={30}
            onPress={() => console.log('ohno')} />
          
        </View>

          <Card>
            <View style={{ alignItems: "center"}}>
            <Text style={styles.txt1style}>Nafisa Mehjabin</Text>
              <Text style={styles.txt2style}>Born on: 16th March, 1998</Text>
              <Text style={styles.txt2style}>Address: Dhanmondi-8, Dhaka</Text>
              <Text style={styles.txt2style}>Works at:  </Text>
              
            </View>
          </Card>
          
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  
  imgStyle:{
    width:200,
    height:200,
    borderRadius:100,
    alignSelf:"center",
    overflow:'hidden',  
  },
  addStyle:{
     position:"absolute",
     width:60,
     height:60,
     bottom:0,
     right:0,
     borderRadius:30,
     justifyContent:"center",
     alignItems:"center"

  },
  txt1style:{
    alignSelf:"center",
    fontSize:36,
     fontWeight:'200'
  },
  txt2style:{
    alignSelf:"auto",
    fontSize:15,
     fontWeight:"100"
  },
  deleteStyle:{
    width:60,
    height:60,
    bottom:0,
    right:0,
    marginTop:30,
    alignSelf:"center"
 },
});

export default ProfileScreen;