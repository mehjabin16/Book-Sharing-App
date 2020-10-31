import React, { useState, useEffect } from "react";
import {  View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {AuthContext} from "../provider/AuthProvider";
import PostCard from "./../components/PostCard";
import HeaderHome from "../components/HeaderHome";
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
 
  const loadPosts = async () => {   
    const response = await getPosts();
    if (response.ok) {
      setPosts(response.data);
    } else {
      alert(response.problem);
    }
  };
 
  const getName = (id) => {
    let name = "";
    users.forEach((element) => {
      if (element.id == id) {
        name = element.name;
      }
    });
    return name;
  };

  useEffect(() => {
    loadPosts();
  }, []);

return(
    <AuthContext.Consumer>
   {(auth)=>(
    <View style={styles.viewStyle}>
    <HeaderHome
      DrawerFunction={() => {
        props.navigation.toggleDrawer();
      }}
    />
    <Card>
      <Input
        placeholder="What's On Your Mind?"
        leftIcon={<Entypo name="pencil" size={24} color="black" />}
      />
      <Button title="Post" type="outline" onPress={function () {}} />
    </Card>
   

    <FlatList
      data={posts}
      renderItem={({ item }) => {
        return (
          <PostCard
            author={getName(item.userId)}
            title={item.title}
            body={item.body}
          />
        );
      }}
    />
  </View>
)}

    </AuthContext.Consumer>
);

}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
      },
      viewStyle: {
        flex: 1,
      },

});

export default HomeScreen;

