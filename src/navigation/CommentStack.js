import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "./../screens/PostScreen";

const stack = createStackNavigator();

const CommentStack = () => {
  return (
    <stack.Navigator>
    <stack.Screen name="Home" component={HomeScreen}/>
    <stack.Screen name="Post" component={PostScreen}/>
    </stack.Navigator>
    )
  }
export default CommentStack;
