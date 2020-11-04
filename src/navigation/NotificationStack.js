import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PostScreen from "../screens/PostScreen";
import HomeTabScreen from "./HomeTab"

const NotificationStack = createStackNavigator();


const NotificationStackScreen =() =>{
  return(
    <NotificationStack.Navigator initialRouteName ="Home">
      <NotificationStack.Screen name= "HomeTab" 
      component={HomeTabScreen} 
      options={{headerShown: false}} 
      />
      <NotificationStack.Screen name= "Post" 
      component={PostScreen} 
      options={{headerShown: false}}
      />
    </NotificationStack.Navigator>
  )
}

export default NotificationStackScreen;
