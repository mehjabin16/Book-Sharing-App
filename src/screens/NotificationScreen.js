<<<<<<< HEAD
import React, {useState} from "react";
=======
import React from "react";
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
import { View, StyleSheet, Button } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import PostScreen from "./../screens/PostScreen";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";

const NotificationScreen = (props) => {
  const [LikeList, setLikeList] = useState([]);
  const [CommentList, setCommentList] = useState([]);
 

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <View>
<<<<<<< HEAD
           
=======
            <Button
            title="See Post"
             >
            </Button>
>>>>>>> 3537d3f4bded045a420e285e0b1c92dafd8fa3e7
          </View>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "#F6EBF9" }}
                rounded
                icon={{
                  name: "thumbs-o-up",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
                onPress ={
                  function(){
                    props.navigation.navigate("Post");
                  }
                }
              />
              <Text style={{ paddingHorizontal: 10 }}>
                Pam Beesley Liked Your Post.
              </Text>
            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;