import React, { useState } from "react";
import {View, StyleSheet, Text,Image} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import { storeDataJSON } from "../functions/AsyncFunctions";

const SignUpScreen = (props) => {
    const [Name, setName] =useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");


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
            placeholder='Student ID'
            onChangeText ={function(currentInput){
                setSID(currentInput);
            }}
            />

            <Input leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder='E-mail Address'
            onChangeText ={function(currentInput){
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
             onPress={
                 function(){
                     let currentUser ={
                         name:Name,
                         sid:SID,
                         email:Email,
                         password:Password,
                     };
                 storeDataJSON(Email, currentUser);
                 props.navigation.navigate("LogIn");

                 }}
            />

            <Button icon={<AntDesign name="user" size={24} color="#5B2C92" />}
             title=" Already have an account?"
             titleStyle ={styles.button2Style}
             type='clear'
             onPress={function(){
              props.navigation.navigate("LogIn");
             }   
            }/>

        </Card>
    </View>
);

}

const styles = StyleSheet.create({
    viewStyle: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'white'
      },
      imgStyle: {
          width: 550,
          height: 300,
          alignSelf:"center"
  
      },
      buttonStyle:{
          backgroundColor: "#5B2C92"
          
      },
      button2Style:{
          color: "#5B2C92"
          
      },
      titleStyle:{
          fontSize: 30,
          alignSelf:"center",
          fontWeight: "bold",
          color:"#5B2C92"
      }
});

export default SignUpScreen;

