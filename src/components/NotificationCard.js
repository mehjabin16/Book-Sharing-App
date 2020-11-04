import React, {useState} from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";

const NotificationCard = (props) => {
 const notification=props.notificatiions
 const currentUser=props.currentUser
  
  const [statement ,setStatement]=useState("liked your post")
  const [check,setCheck]=useState(false)
  //console.log(notification.status)
  const checkNotificationStatus=()=>{
    if(notification.status==="comment"){

    setStatement("commented on your post")
    }
    
    setCheck(true)

}


if(!check)
checkNotificationStatus()

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
                    //props.navigation.navigate("Post");
                  }
                }
              />
               <Text >{notification.name} </Text>
                <Text></Text>
                <Text >{statement} </Text>
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

export default NotificationCard;