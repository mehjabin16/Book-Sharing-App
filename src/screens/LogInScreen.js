import React, { useState } from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import {Input, Button, Card} from "react-native-elements";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import {getDataJSON} from "../functions/AsyncFunctions";
import { color } from "react-native-reanimated";

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
            Welcome Back
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
             title=" SignIn"
             type="solid"
             buttonStyle ={styles.buttonStyle}
             onPress={async function() {
                   let UserData =await getDataJSON(Email);
                   if(UserData.password == Password)
                   {     
                   auth.setIsLoggedIn(true);       
                   }
                   else{
                       alert('Login Failed');
                       console.log(UserData);
                   }
                }}
            />

            <Button icon={<AntDesign name="user" size={24} color="#5B2C92" />}
             title=" Don't have an account?"
             type='clear'
             titleStyle={styles.button2Style}
             onPress={function(){
              props.navigation.navigate("SignUp");
             }   
            }
           
            />

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
        marginHorizontal:20,
        alignSelf:"center",
        fontWeight: "bold",
        color: "#5B2C92"
    }


});

export default LogInScreen;

