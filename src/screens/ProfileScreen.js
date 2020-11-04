import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, Card, Icon, Button, Input } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import {storeDataJSON, getDataJSON, removeData} from "../functions/AsyncFunctions";


const ProfileScreen = (props) => {
  const [Bithdate, setBirthdate] = useState("");
  const [Address, setAdress] = useState("");
  const [Work, setWork] = useState("");
  //const [UserProfile, setUserProfile] = useState([]);

 

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ScrollView>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <View style={{alignSelf:"center" , marginTop:30}}>
         <View>
         <Image source={require('./../../assets/avatar.png')}
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
        <Text style={styles.txt1style}>{auth.CurrentUser.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:30, alignSelf:"center"}}>
        <Button
          type="outline"
          title="  Delete Account?"
          titleStyle ={styles.button2Style}
          icon={<AntDesign name="delete" size={28} color="red" />}
          onPress={
          function(){
            removeData('userprofile')
          }
        }
        />
        </View>
          <Card>
          <Text style={{fontSize:20, alignSelf:"center", fontWeight:"800"}}> Edit Profile</Text>
          <Card.Divider/>
            <Input leftIcon={<FontAwesome name="calendar" size={24} color="black" />}
            placeholder='Born On'
            onChangeText ={function(currentInput){
                setBirthdate(currentInput);
            }}
            />

            <Input leftIcon={<FontAwesome name="address-card" size={24} color="black" />}
            placeholder='Address'
            onChangeText ={function(currentInput){
                setAdress(currentInput);
            }}
            />
             <Input leftIcon={<Entypo name="suitcase" size={24} color="black" />}
            placeholder="Works At"
            onChangeText ={function(currentInput){
                setWork(currentInput);
            }}
            />
            <Button type="outline" title="Confirm?"
            onPress={
              async function(){
                const Username = auth.CurrentUser.name
                let User ={
                  name:Username,
                  birthdate:Bithdate,
                  address:Address,
                  work:Work,
              };
              storeDataJSON('userprofile', User);
              //console.log(User);
              auth.setUserProfile(await getDataJSON('userprofile'));
               //console.log(UserProfile);
              }
            }
            />
            <View style={{marginTop:10}} >
             <Text style={styles.txt2style}>Born On  :        {auth.UserProfile.birthdate}</Text>
              <Text style={styles.txt2style}>Address :        {auth.UserProfile.address}</Text>
              <Text style={styles.txt2style}>Works At:        {auth.UserProfile.work} </Text>
            </View>
          </Card>
          </ScrollView>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "white"
  },
  
  imgStyle:{
    width:210,
    height:210,
    borderRadius:100,
    alignSelf:"center",
    overflow:'hidden',  
  },
  addStyle:{
     position:"absolute",
     width:65,
     height:65,
     bottom:12,
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
    marginLeft:10,
    fontSize:16,
    fontWeight:"100"
  },
  button2Style:{
    color: "red"
 },
});

export default ProfileScreen;