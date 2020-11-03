import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PostScreen from "../screens/PostScreen";
import HomeTabScreen from "./HomeTab"

const PostStack = createStackNavigator();


const PostStackScreen =() =>{
  return(
    <PostStack.Navigator initialRouteName ="Notification">
      <PostStack.Screen name= "Notification" 
      component={NotificationScreen} 
      options={{headerShown: false}} 
      />
      <PostStack.Screen name= "Post" 
      component={PostScreen} 
      options={{headerShown: false}}
      />
    </PostStack.Navigator>
  )
}

export default PostStackScreen;
