import React, {useState, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Card, Button, Text, Avatar, Image, Icon } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-elements';
import {
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import * as firebase from "firebase";
import "firebase/firestore";

import { AuthContext } from "../provider/AuthProvider";

const IncomingRequestCard = (props) => {
const thumbnail = require('./../../assets/icon.png');
const navigation = useNavigation();
const [ratingCount, SetratingCount]= useState(0)

    return (
        <AuthContext.Consumer>
        {(auth) => (
        <TouchableOpacity onPress={
             ()=>
                navigation.navigate('BookDetails',{
                name: props.title,
                author: props.author,
               })}
               style={{
                flexDirection: 'row',
                padding: 5,
              }}
        >
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: responsiveHeight(12),
              width: responsiveWidth(80),
              marginRight: 10,
              marginBottom:15,
              marginTop:10
            }}
          >
            <Image
            source={require('./../../assets/icon.png')}
            style={{
              borderRadius: 50,
              height: 100,
              width: 100,
              alignSelf:"center",
              paddingBottom:20
            }}
          />

        <View
          style={{
            flex:3,
            flexDirection:'column',
            padding: 10,
          }}
        > 
          <Text h4Style={{ padding: 10, fontSize:16 }} h4>
            {props.borrower}
          </Text>
          <Text>   {props.title}
          </Text>
          <Text>   Author: {props.author}
          </Text>
          <Text>   {props.status}
          </Text>
        </View>
        </View>
        <Card.Divider />
         
            <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent: "space-between"}}>
           
            <Button
               title= 'Accept'
               type="outline"
               titleStyle = {styles.button2Style}
               icon={<AntDesign name={"like1"} size={24} color="#98A1DF" />}
            />
            <Button
               title= 'Reject'
               type="outline"
               titleStyle = {styles.button2Style}
               icon={<FontAwesome name={"comments"} size={24} color="#98A1DF" />}
          />
            </View>            
          
       
        </Card>
        </TouchableOpacity>
       )}
       </AuthContext.Consumer>
    )
    
    }
    const styles = StyleSheet.create({
      buttonStyle:{
          backgroundColor: "#98A1DF"
          
      },
      button2Style:{
          color: "#98A1DF"
          
      },
      iconStyle:{
        backgroundColor: "#FFB7B2"
        
    },
    
    
    });

export default IncomingRequestCard;