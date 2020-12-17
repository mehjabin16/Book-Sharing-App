import React, { useState } from "react";
import {View, StyleSheet, Text,Image} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import Loading from "../components/Loading";
import { storeDataJSON } from "../functions/AsyncFunctions";
import * as firebase from "firebase";
import "firebase/firestore";

const SignUpScreen = (props) => {
    const [Name, setName] =useState("");
    const [ContactNo, setContactNo] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    //const [Guid, setGuid] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <Loading />;
  } else {
    

return(
    <View style={styles.viewStyle}>
          <Image source={require('./../../assets/signup.png')}
         resizeMode="center"
         style={styles.imgStyle}>
        </Image>
        <Text style={styles.titleStyle}>
          Let's Get Started
        </Text>
        <Card>
            <Card.Divider/>
            <Input leftIcon={<Entypo name="user" size={24} color="black" />}
            placeholder='Name'
            onChangeText ={function(currentInput){
                setName(currentInput);
            }}
            />

            <Input leftIcon={<AntDesign name="idcard" size={24} color="black" />}
            placeholder='Contact No'
            onChangeText ={function(currentInput){
                setContactNo(currentInput);
            }}
            />

            <Input leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder='E-mail Address'
            onChangeText ={ function(currentInput){
                setEmail(currentInput);
            }}
            />

            <Input leftIcon={<Entypo name="key" size={24} color="black" />}
            placeholder='Password'
            onChangeText ={function(currentInput){
                setPassword(currentInput);
            }}
            secureTextEntry= {true}
            />


            <Button icon={<AntDesign name="login" size={24} color="white" />}
             title=' Sign Up!'
             buttonStyle ={styles.buttonStyle}
             type='solid'
             onPress={() => {
                if (Name && ContactNo && Email && Password) {
                  //setIsLoading(true);
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(Email, Password)
                    .then((userCreds) => {
                      userCreds.user.updateProfile({ displayName: Name });
                      firebase
                        .firestore()
                        .collection("users")
                        .doc(userCreds.user.uid)
                        .set({
                          name: Name,
                          contactno: ContactNo,
                          email: Email,
                        })
                        .then(function (doc) {
                         // setIsLoading(false);
                          alert("Account created successfully with id: " + userCreds.user.uid);
                          //console.log(userCreds.user);
                          props.navigation.navigate("LogIn");
                        })
                        .catch((error) => {
                          //setIsLoading(false);
                          alert(error);
                        });
                    })
                    .catch((error) => {
                      //setIsLoading(false);
                      alert(error);
                    });
                } else {
                  alert("Fields can not be empty!");
                }
              }}
            />

        <View style={{ flexDirection: "row", justifyContent:"center", marginLeft:10, marginTop:20}}>
            
            <Text style={styles.txtStyle}>
            Already have an account?
            </Text>
           <Button 
             title="Sign In"
             type='clear'
             titleStyle={styles.button2Style}
             onPress={function(){
                props.navigation.navigate("LogIn");
               } }  
            /> 
           </View>
           </Card>
    </View>
);

}}

const styles = StyleSheet.create({
    viewStyle: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'white'
      },
      imgStyle: {
          width: 500,
          height: 250,
          alignSelf:"center"
  
      },
      buttonStyle:{
          backgroundColor: "#5B2C92"
          
      },
      button2Style:{
        color: "#4169E1",
        fontSize:14,
        fontWeight:"100",
        
    },
      titleStyle:{
          fontSize: 30,
          alignSelf:"center",
          fontWeight: "bold",
          color:"#5B2C92"
      },
      txtStyle:{
        marginLeft:0,
        marginHorizontal:20,
        alignSelf:"center",
        color: "#5B2C92",
        
    }
});

export default SignUpScreen;

