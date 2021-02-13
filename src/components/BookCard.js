import React, {useState, useEffect} from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Card, Button, Text, Avatar, Image } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-elements';
import {
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import * as firebase from "firebase";
import "firebase/firestore";

import { AuthContext } from "../provider/AuthProvider";

const BookCard = (props) => {
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
                padding: 6,
              }}
        >
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: responsiveHeight(16),
              width: responsiveWidth(80),
              marginRight: 10,
            }}
          >
            <Image
            source={require('./../../assets/icon.png')}
            style={{
              borderRadius: 3,
              height: 100,
              width: 100,
              alignSelf:"center"
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
            {props.title}
          </Text>
          <Text>   Author: {props.author}
          </Text>
          <Rating
           ratingCount= {5}
           style={{ paddingVertical: 10,  marginRight:122}}
           imageSize={14}
           onFinishRating={SetratingCount}
         />
        </View>
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

export default BookCard;