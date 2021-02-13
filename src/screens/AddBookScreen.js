import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet, Alert, ActivityIndicator, } from "react-native";

import { Card, Button, Text, Avatar, Input } from "react-native-elements";
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from "../provider/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'expo-image-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const AddBookScreen = (props) => {

  const [curDate, setCurDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [bookAuthor, setbookAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setdescription] = useState("");

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Need camera roll permissions');
        }
      }
    })();
  }, []);

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhotoFromCamera = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = firebase.storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };


  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setCurDate(date + '/' + month + '/' + year);

  }, []);



  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <Card>
            <Input
              multiline
              placeholder="Enter The Book Title"
              leftIcon={<Entypo name="book" size={24} color="black" />}
              onChangeText={function (val) {
                setTitle(val);

              }}
            />
            <Input
              multiline
              placeholder="Enter The Author Name"
              leftIcon={<Entypo name="user" size={24} color="black" />}
              onChangeText={function (val) {
                setbookAuthor(val);

              }}
            />
            <Input
              multiline
              placeholder="Enter The Genre"
              leftIcon={<Entypo name="open-book" size={24} color="black" />}
              onChangeText={function (val) {
                setGenre(val);

              }}
            />
            <Input
              multiline
              placeholder="Enter The Description"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={function (val) {
                setdescription(val);

              }}
            />

            <Avatar
              size="xlarge"
              onPress={function () {
                choosePhotoFromLibrary()
              }}
              source={{
                uri: image
              }}
            />

            <Button title="Add" titleStyle={styles.button2Style}
              buttonStyle={styles.buttonStyle}
              type="solid" onPress={
                function () {
                  setLoading(true);
                  firebase
                    .firestore()
                    .collection("books")
                    .add({
                      userId: auth.CurrentUser.uid,
                      title: title,
                      bookAuthor: bookAuthor,
                      genre: genre,
                      description: description,
                      user: auth.CurrentUser.displayName,
                      created_at: curDate,
                    })
                    .then(function (doc) {
                      //setNewPost(" ");
                      console.log('Book Added!');
                      //console.log(uploadImage());
                      Alert.alert("Book id: " + doc.id);
                      setLoading(false);
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert(error);
                    });
                }}
            />
            <ActivityIndicator size="large" color="blue" animating={loading} />
          </Card>


          <ActionButton buttonColor="#2e64e5">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="Take Photo"
              onPress={takePhotoFromCamera}>
              <Entypo name="camera" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="Choose Photo"
              onPress={choosePhotoFromLibrary}>
              <Entypo name="image" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
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
    backgroundColor: "#eae5ff"
  },
  buttonStyle: {
    backgroundColor: "#873FB2",
    marginTop: 30
  },
  button2Style: {
    color: "white"
  },
  imgageStyle: {
    marginLeft: 100
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },


});

export default AddBookScreen;