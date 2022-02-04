/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from "react-native-image-crop-picker";

const App = () => {

  const [list, setList] = useState(
    [
      { key: "Square" },
      { key: "Portrait" },
      { key: "LandScape" },
    ]
  );

  const renderItem = (item ) => (
    <View style={styles.GridViewContainer}>
      <Text style={styles.GridViewTextLayout} 
    //  onPress={this.GetGridViewItem.bind(this, item.key)} 
      > 
        {item.key} 
      </Text>
   </View> 
); 

async function checkOrientation(img){
  if (img.width > img.height) {
    console.log('landscape');
    await As
    } else if (img.width < img.height) {
    console.log('portrait');
    } else {
    console.log('even');
    }
}

function openImagePicker(type) {
  if (type === "camera"){
    ImagePicker.openCamera({
      cropping: true,
  })
      .then((image) => {
          checkOrientation(image.cropRect);
          console.log(image);
      })
      .catch((error) => {
          console.log(error);
      });
  } else {
    ImagePicker.openPicker({
      cropping: true,
  })
      .then((image) => {
        checkOrientation(image.cropRect);
        console.log(image);
      })
      .catch((error) => {
          console.log(error);
      });
  }
}

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
        <View
          style={styles.Container}>
          {/* <Text style={styles.Title}>{"List of Image Categories"}</Text> */}
          <FlatList
                  data={list}
                  renderItem={ ({item}) => renderItem(item)}
                  keyExtractor={item => item.key}
                  numColumns={2}
                />
                {/* <Image
          source={{uri: "file:///data/user/0/com.think_bridge/cache/rn_image_picker_lib_temp_46b65a5f-69ef-45a2-b7c2-0ee517112bde.jpg"}}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{filePath.uri}</Text> */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => {openImagePicker("camera")}}>
          <Text style={styles.textStyle}>
            Launch Camera for Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => {openImagePicker("gallery")}}>
          <Text style={styles.textStyle}>Choose Image from Gallery</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
    margin:5,
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle:'normal',
    color:"#0A0AFF",
    marginVertical:10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  GridViewContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 5,
    backgroundColor: '#7BBFFF'
 },
 GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#fffF',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default App;
