import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import MyRequestsScreen from "./src/screens/MyRequestsScreens.js";
import MybookScreen from "./src/screens/MyBooks.js";
import AddBookScreen from "./src/screens/AddBookScreen.js";
import NotificationStackScreen from "./src/navigation/NotificationStack.js";
import SignUpScreen from "./src/screens/SignUpScreen.js";
import LogInScreen from "./src/screens/LogInScreen.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";
import {AuthContext, AuthProvider} from "./src/provider/AuthProvider";
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAo0PNy-Jbx5z_5pM-KH7FyThLYZVZF5Tw",
    authDomain: "booksharingapp-e7155.firebaseapp.com",
    projectId: "booksharingapp-e7155",
    storageBucket: "booksharingapp-e7155.appspot.com",
    messagingSenderId: "63457459925",
    appId: "1:63457459925:web:8846360ea699d0e9202c5c"
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
      <AppDrawer.Screen name= "Borrowed"  
      children={()=><MyRequestsScreen currentUser={auth.CurrentUser} />} />
      <AppDrawer.Screen name= "My Books"  
      children={()=><MybookScreen currentUser={auth.CurrentUser} />} />
      <AppDrawer.Screen name= "Add New Book" component={AddBookScreen} />
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