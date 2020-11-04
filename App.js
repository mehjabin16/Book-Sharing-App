import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import PostScreen from "./src/screens/PostScreen.js";
import NotificationScreen from "./src/screens/NotificationScreen.js";
import NotificationStackScreen from "./src/navigation/NotificationStack.js";
import SignUpScreen from "./src/screens/SignUpScreen.js";
import LogInScreen from "./src/screens/LogInScreen.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";


import {AuthContext, AuthProvider} from "./src/provider/AuthProvider";

const AppDrawer = createDrawerNavigator();
const AuthStack = createStackNavigator();


const AppDrawerScreen =() =>{
  return(
    <AppDrawer.Navigator initialRouteName="Home" >
      <AppDrawer.Screen name= "Home" component={NotificationStackScreen} />
      <AppDrawer.Screen name= "Profile" component={ProfileScreen} />
     
    </AppDrawer.Navigator>
  )
}
const AuthStackScreen =() =>{
  return(
    <AuthStack.Navigator initialRouteName ="LogIn">
      <AuthStack.Screen name= "SignUp" 
      component={SignUpScreen} 
      options={{headerShown: false}} 
      />
      <AuthStack.Screen name= "LogIn" 
      component={LogInScreen} 
      options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  )
}


function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
export default App;