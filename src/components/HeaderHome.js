import React from "react";
import { Header } from "react-native-elements";
import { AuthContext } from "../provider/AuthProvider";
const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header backgroundColor='#873FB2'
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: props.DrawerFunction,
          }}
          centerComponent={{ text: "Westeros", style: { color: "#fff" } }}
          rightComponent={{
            icon: "lock-outline",
            color: "#fff",
            onPress: function () {
              
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
               
            },
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;