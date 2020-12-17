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
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAB_r6Xq_8HOnKTyRK-DSk3UNEjx7m2pws",
  authDomain: "myblog-84d6d.firebaseapp.com",
  databaseURL: "https://myblog-84d6d-default-rtdb.firebaseio.com",
  projectId: "myblog-84d6d",
  storageBucket: "myblog-84d6d.appspot.com",
  messagingSenderId: "60212282971",
  appId: "1:60212282971:web:7565e0b05b5f3569a4e17e"
};
// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

const AppDrawer = createDrawerNavigator();
const AuthStack = createStackNavigator();
const AppDrawerScreen =() =>{
  return(
    <AuthContext.Consumer>
    {(auth) => (
    <AppDrawer.Navigator initialRouteName="Home" >
      <AppDrawer.Screen name= "Home" component={NotificationStackScreen} />
      <AppDrawer.Screen name= "Profile" 
      //component={ProfileScreen}
      //screenOptions={({navigation})}
      children={()=><ProfileScreen currentUser={auth.CurrentUser} />} />
    </AppDrawer.Navigator>
    )}
     </AuthContext.Consumer>
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