import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import HomeTabScreen from "./HomeTab"

const NotificationStack = createStackNavigator();


const NotificationStackScreen =() =>{
  return(
    <NotificationStack.Navigator initialRouteName ="Home">
      <NotificationStack.Screen name= "HomeTab" 
      component={HomeTabScreen} 
      options={{headerShown: false}} 
      />
      <NotificationStack.Screen name= "BookDetails" 
      component={BookDetailsScreen} 
      options={{headerShown: false}}
      />
      <NotificationStack.Screen name= "Map" 
      component={MapScreen} 
      options={{headerShown: false}}
      />
    </NotificationStack.Navigator>
  )
}

export default NotificationStackScreen;
