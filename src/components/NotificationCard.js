import React, {useState} from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";
import { useNavigation } from '@react-navigation/native';

const NotificationCard = (props) => {
 const notifications=props.notificatiions 
 const currentUser=props.currentUser
  const [statement ,setStatement]=useState("")
  const [check,setCheck]=useState(false)
  const navigation = useNavigation();
  //console.log(notification.status)
  /*const checkNotificationStatus=()=>{
    if(notification.status=="comment"){

    setStatement("commented on your post")
    }   
    setCheck(true)

}

if(!check)
checkNotificationStatus()*/

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
         
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" ,padding:6}}>
              <Avatar
                containerStyle={{ backgroundColor: "#F6EBF9" }}
                
                icon={{
                  name: "commenting",
                  type: "font-awesome",
                  color: "black",
                  size:20
                }}
                activeOpacity={1}
                onPress ={
                  function(){
                    ()=>navigation.navigate('Post' ,{currentUser} );
                  }
                }
              />
               <Text >  {props.commenter} </Text>
                
                <Text >commented on your post</Text>
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