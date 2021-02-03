import React from "react";
import { Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
import * as firebase from "firebase";
import "firebase/firestore";
const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header backgroundColor='#98A1DF'
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: props.DrawerFunction,
          }}
          centerComponent={{ text: "Central Park", style: { color: "#fff" } }}
          rightComponent={{
            icon: "lock-outline",
            color: "#fff",
            onPress: function () {
              
              firebase
              .auth()
              .signOut()
              .then(() => {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              })
              .catch((error) => {
                alert(error);
              })
               
            },
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;