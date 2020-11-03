import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Avatar, Button, Input } from "react-native-elements";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
const PostScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
           <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          /><Button
          title="Go Back" onPress={
            function(){
              props.navigation.navigate("Notification");
            }
          }
           >
          </Button>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
             containerStyle={{ backgroundColor: "#F7E5FF" }}
             rounded
             icon={{ name: "user", type: "font-awesome", color: "black" }} 
             activeOpacity={1}
             />
              <Text h4Style={{ padding: 10 }} h4>
               {auth.CurrentUser.name}
              </Text>
            </View>
            <Text style={{ fontStyle: "italic" }}> 
              posted on {props.date}
            </Text>
            <Card.Divider />
            <Text
             style={{ paddingVertical: 10, }}>
           {props.body}
          </Text>
          <Card.Divider />
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              
              <Text style={{ paddingHorizontal: 10 }}>
               Like:          Comment:
              </Text>
            </View>
            
          </Card>
      
          </Card>
          
          <Card>
      <Input 
        multiline
        placeholder="Write Something"
        leftIcon={<Entypo name="pencil" size={24} color="black" />}
        onChangeText ={function(val){
          setPostbody(val);
      }}
      />
      <Button title="Comment" titleStyle={styles.button2Style}
       type="outline" >

       </Button>
       </Card>
       <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>        
            <Text style={{ paddingHorizontal: 10 }}>
                
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

export default PostScreen;