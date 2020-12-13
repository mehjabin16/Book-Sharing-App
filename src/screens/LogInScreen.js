import React, { useState } from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import {getDataJSON} from "../functions/AsyncFunctions";
import * as firebase from "firebase";


const LogInScreen = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

return(
    <AuthContext.Consumer>
    {(auth)=>(
    <View style={styles.viewStyle}>
        <Image source={require('./../../assets/undraw_blogging_vpvv.png')}
         resizeMode="center"
         style={styles.imgStyle}>
        </Image>
        <Text style={styles.titleStyle}>
            Welcome Back!
        </Text>
        <Card>
        
            <Card.Divider/>
            <Input leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder='E-mail Address'
            onChangeText ={function(currentInput){
                setEmail(currentInput);
            }}
            />

            <Input leftIcon={<Entypo name="key" size={24} color="black" />}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText ={function(currentInput){
                setPassword(currentInput);
            }}
            />

            <Button icon={<AntDesign name="login" size={24} color="white" />}
             title=" Sign In"
             type="solid"
             buttonStyle ={styles.buttonStyle}
             onPress={() => {
                //setIsLoading(true);
                firebase
                  .auth()
                  .signInWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    //setIsLoading(false);
                    auth.setIsLoggedIn(true);
                    auth.setCurrentUser(userCreds.user);
                  })
                  .catch((error) => {
                    //setIsLoading(false);
                    alert(error);
                  });
              }}
            />
           <View style={{ flexDirection: "row", justifyContent:"center", marginLeft:10, marginTop:20}}>
            
            <Text style={styles.txtStyle}>
            Don't have an account?
            </Text>
           <Button 
             title="Sign Up"
             type='clear'
             titleStyle={styles.button2Style}
             onPress={function(){
              props.navigation.navigate("SignUp");
             }   
            }         
            /> 
           </View>
           </Card>
    </View>)}
    </AuthContext.Consumer>
);

}

const styles = StyleSheet.create({
    viewStyle: {
      flex:1,
      justifyContent:'center',
      backgroundColor:'white'
    },
    imgStyle: {
        width: 400,
        height: 300,
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
        marginHorizontal:20,
        alignSelf:"center",
        fontWeight: "bold",
        color: "#5B2C92"
    },
    txtStyle:{
        marginLeft:0,
        marginHorizontal:20,
        alignSelf:"center",
        color: "#5B2C92",      
    }


});

export default LogInScreen;

