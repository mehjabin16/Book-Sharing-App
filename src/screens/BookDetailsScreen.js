import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Button, Input, Icon, Image } from "react-native-elements";
import { AntDesign, Entypo, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import { Rating } from 'react-native-elements';
import * as firebase from "firebase";
import "firebase/firestore";
import { useNavigation } from '@react-navigation/native';


const BookDetailsScreen = (props) => {
  //console.log(props);
  const [notificationList, setNotificationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ratingCount, SetratingCount]= useState(0)
  const navigation = useNavigation();

  const loadComments = async () => {
    setIsLoading(true);
    firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.postID)
        .onSnapshot((querySnapShot) => {
            setIsLoading(false);
            setCommentList(querySnapShot.data().comments);
            let commentCount = commentList.length ;
            setCommentCount(commentCount);
            setLikersList(querySnapShot.data().likers);
            let likeCount = LikersList.length;
            setLikeCount(likeCount) ;
        })
        .catch((error) => {
            setIsLoading(false);
            alert(error);
        })
}

  useEffect(() =>{
   
  },[]);
    
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
           <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Button
          type="solid"
          title="Go Back"
          titleStyle={styles.buttonStyle}
          buttonStyle={{alignSelf:"flex-start", marginLeft:0,paddingRight:330, backgroundColor:"black"}}
          icon={<MaterialIcons name="arrow-back" size={28} color="white" />}
          iconContainerStyle ={{alignSelf:"auto"}}
          onPress={
            function(){
              props.navigation.navigate("HomeTab");
            }} 
          />
          
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" , padding:8}}>
            <Image
            source={require('./../../assets/icon.png')}
            style={{
              borderRadius: 3,
              height: 100,
              width: 100,
              alignSelf:"center"
            }}
          /> 
          <View
          style={{
            flex:3,
            flexDirection:'column',
            padding: 10,
          }}
        > 
            <Text h4Style={{ padding: 10, fontSize:20 }} h4>{props.route.params.name}</Text>
            <Text style={{ fontStyle: "italic", fontSize:14 }}>  Author: {props.route.params.author}</Text>
            <Rating
           ratingCount= {5}
           style={{ paddingVertical: 10,  marginRight:122}}
           imageSize={14}
           onFinishRating={SetratingCount}
         />
            </View>
            </View>
            <Card.Divider />
            <Button
               title= 'available'
               type="outline"
               titleStyle = {styles.button2Style}
               
            />
          <Card.Divider />
          </Card>  
          <Card>
            <View style={{ flexDirection: 'column', alignItems: 'stretch' ,justifyContent: 'flex-end'}}>
            <Button
               title= 'request'
               type="outline"
               titleStyle = {styles.button2Style}  
               onPress={
                ()=>
                navigation.navigate('Map')
               }  
          />
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
    backgroundColor:"#eae5ff",
    flex: 1,
  },
  buttonStyle:{
    color: "white",
    fontSize:14,
    fontWeight:"100",
    marginLeft:10,

},
button2Style:{
  color: "#98A1DF",
  fontSize:16,
  fontWeight:"100",
}

});

export default BookDetailsScreen;