import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "./../screens/NotificationScreen";
import PostStackScreen from "./PostStack";
import CommentStackScreen from "./CommentStack";
import { StyleSheet } from "react-native";


const HomeTab = createMaterialBottomTabNavigator();


const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="HomeStack" activeColor="white"
    barStyle={{ backgroundColor: '#873FB2' }}>
      <HomeTab.Screen 
        name="HomeStack"
        component={CommentStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
          
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={PostStackScreen}
        options={{
           tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeTabScreen;