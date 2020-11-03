import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Button, Input } from "react-native-elements";
import { FontAwesome, Entypo } from '@expo/vector-icons';
import HeaderHome from "./../components/HeaderHome";
import CommentCard from "./../components/CommentCard"
import { AuthContext } from "../provider/AuthProvider";
import { storeDataJSON, getDataJSON , removeData } from "../functions/AsyncFunctions";

const PostScreen = (props) => {
  const [CurDate, setCurDate] = useState("");
  const [Commentbody, setCommentbody] = useState("");
  const [CommentList, setCommentList] = useState([]);
 
  useEffect(() =>{
   var date= new Date().getDate();
   var month= new Date().getMonth()+1;
   var year= new Date().getFullYear();
   setCurDate(date+'/'+month+'/'+year);
   const getData = async()=>
   {
     setCommentList(await getDataJSON('comments'));
   }
   getData();
  },[]);

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
          setCommentbody(val);
      }}
      />
      <Button title="Comment" titleStyle={styles.button2Style}
       type="outline"
       onPress={
        async function(){
          if(CommentList !=null){
            setCommentList(comments => [
              ...comments,
              {
                name: auth.CurrentUser.name,
                date: CurDate,
                commentbody: Commentbody,
                key : Commentbody,
              },
            ]);
          }
          else{
            const array = [];
            array.push({
                name: auth.CurrentUser.name,
                date: CurDate,
                commentbody: Commentbody,
                key : Commentbody,
            });
            setCommentList(array)
          }
          await storeDataJSON('comments', CommentList);
       } } >
       </Button>
       </Card>
       <FlatList
      data ={CommentList}
      renderItem ={ postitem =>{
        return(
          <CommentCard
          author={postitem.item.name}
          date= {postitem.item.date}
          body= {postitem.item.commentbody}    
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
    flex: 1,
  },
});

export default PostScreen;