import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PostScreen from "../screens/PostScreen";

const CommentStack = createStackNavigator();


const CommentStackScreen =() =>{
  return(
    <CommentStack.Navigator initialRouteName ="Home">
      <CommentStack.Screen name= "Home" 
      component={HomeScreen} 
      options={{headerShown: false}} 
      />
      <CommentStack.Screen name= "Post" 
      component={PostScreen} 
      options={{headerShown: false}}
      />
    </CommentStack.Navigator>
  )
}

export default CommentStackScreen;
