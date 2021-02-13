import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, Header, Button, Image } from "react-native-elements";
import { AntDesign, Entypo, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import HeaderHome from "./../components/HeaderHome";
import { AuthContext } from "../provider/AuthProvider";
import MyRequestCard from "./../components/MyRequestCard"
import * as firebase from "firebase";
import "firebase/firestore";
import { useNavigation } from '@react-navigation/native';


const MybookScreen = (props) => {
  //console.log(props);
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("books")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setBooks(temp_posts);
        console.log(books)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {

    loadBooks();
  }, []);
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
           <HeaderHome
            DrawerFunction={() => {
              navigation.toggleDrawer();
            }}
          />
          <Header
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content" // or directly
                centerComponent={{ text: 'My Books', style: { color: '#fff' } }}
                containerStyle={{
                backgroundColor: '#595373',
                justifyContent: 'center',
                height:60, paddingBottom:20
                  }}
            />
           <ActivityIndicator size="large" color="blue" animating={loading} /> 
           <FlatList
           data ={books}
           renderItem ={ function({item}){
           return(
          <MyRequestCard
          title={item.data.title}
          author= {item.data.bookAuthor}
          />
      )}}
      /> 
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

export default MybookScreen;