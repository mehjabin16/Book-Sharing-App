import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, Card, Icon, Button, Input } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import ImageUpload from '../components/ImageLoader';
import { AuthContext } from "../provider/AuthProvider";
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import {storeDataJSON, getDataJSON, removeData} from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = (props) => {
  const [Bithdate, setBirthdate] = useState("");
  const [Address, setAdress] = useState("");
  const [Work, setWork] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const LoadData = async () => {
    setIsLoading(true);
    firebase
        .firestore()
        .collection('users')
        .doc(props.currentUser.uid)
        .onSnapshot((querySnapShot) => {
            setIsLoading(false);
            setBirthdate(querySnapShot.data().birthdate);
            setAdress(querySnapShot.data().address);
            setWork(querySnapShot.data().work);
        })
        .catch((error) => {
            setIsLoading(false);
            alert(error);
        })
  }
    
    useEffect(() =>{
      LoadData();
     },[]);


  
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              navigation.toggleDrawer();
            }}
          />
          <ScrollView>
          <View style={{alignSelf:"center" , marginTop:30}}>
         <View>
         <View style={{ justifyContent: "center", alignSelf: "center", marginVertical: 40 }}>
              <ImageUpload props={props} />
        </View>
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
        <Text style={styles.txt1style}>{auth.CurrentUser.displayName}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:30, alignSelf:"center"}}>
        <Button
          type="outline"
          title="  Delete Account?"
          titleStyle ={styles.button2Style}
          icon={<AntDesign name="delete" size={28} color="red" />}
          onPress={
            function(){
                firebase
                .firestore()
                .collection('users')
                .doc(props.currentUser.uid)
                .delete()
                .then(function() {
                  alert("Account successfully deleted!");
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                  
                 })
                 .catch(function(error) {
                  console.error("Error removing document: ", error);
                })
            
          }
        }
        />
        </View>
          <Card  >
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
            placeholder="Work"
            onChangeText ={function(currentInput){
                setWork(currentInput);
            }}
            />
            <Button
          type="outline"
          title="Confirm"
          onPress={
          function(){
            firebase
            .firestore()
            .collection('users')
            .doc(auth.CurrentUser.uid)
            .set(
                {  
                  birthdate  : Bithdate,
                  address : Address,
                  work:  Work
                  
                },
               { merge: true }
            )
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            })
            
          }
        }
        />
            
           
            <View style={{marginTop:10, height:200 }} >
             <Text style={styles.txt2style}>Born On  :      {Bithdate}  </Text>
              <Text style={styles.txt2style}>Address :       {Address} </Text>
              <Text style={styles.txt2style}>Work      :       {Work} </Text>
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
    flex: 1,
    backgroundColor:"#eae5ff"
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
    fontWeight:"100",
    padding:10
  },
  button2Style:{
    color: "red"
 },
});

export default ProfileScreen;