import React, { useState } from "react";
import {View, StyleSheet} from "react-native";
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
        <Card>
            <Card.Title>Welcome to AuthApp!</Card.Title>
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

            <Button icon={<AntDesign name="user" size={24} color="dodgerblue" />}
             title=" Already have an account?"
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
        backgroundColor:'#82CFFD'
      }
});

export default SignUpScreen;

