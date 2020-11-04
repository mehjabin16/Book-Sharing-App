import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [CurrentUser, setCurrentUser] = useState({});
  const [UserProfile, setUserProfile] = useState({});
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        CurrentUser: CurrentUser,
        setCurrentUser: setCurrentUser,
        UserProfile: UserProfile,
        setUserProfile: setUserProfile,
        IsLoggedIn: IsLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };