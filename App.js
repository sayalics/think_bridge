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
  Image,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from "react-native-image-crop-picker";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SquareImages from './src/screens/SquareImages';
import LandScapeImages from './src/screens/LandScapeImages';
import PortraitImages from './src/screens/PortraitImages';
import FavoriteImages from './src/screens/FavoriteImages';

const Stack = createNativeStackNavigator();

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
  if (img.cropRect.width > img.cropRect.height) {
      console.log('landscape');
      let array = JSON.parse(await AsyncStorage.getItem('landscapeImageArray')) === null 
        ? [] 
        : JSON.parse(await AsyncStorage.getItem('landscapeImageArray'));
      array.push(img.path);
      console.log("landscapeImageArray",array);
      await AsyncStorage.setItem('landscapeImageArray', JSON.stringify(array));
    } else if (img.cropRect.width < img.cropRect.height) {
        console.log('portrait');
        let array = JSON.parse(await AsyncStorage.getItem('portraitImageArray')) === null 
          ? [] 
          : JSON.parse(await AsyncStorage.getItem('portraitImageArray'));
        array.push(img.path);
        console.log("portraitImageArray",array);
        await AsyncStorage.setItem('portraitImageArray', JSON.stringify(array));
    } else {
        console.log('even');
        let array = JSON.parse(await AsyncStorage.getItem('evenImageArray')) === null 
          ? [] 
          : JSON.parse(await AsyncStorage.getItem('evenImageArray'));
        array.push(img.path);
        console.log("evenImageArray",array);
        await AsyncStorage.setItem('evenImageArray', JSON.stringify(array));
    }
}

function openImagePicker(type) {
  if (type === "camera"){
    ImagePicker.openCamera({
      cropping: true,
  })
      .then((image) => {
          checkOrientation(image);
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
        checkOrientation(image);
        console.log(image);
      })
      .catch((error) => {
          console.log(error);
      });
  }
}

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Square" component={SquareImages} />
        <Stack.Screen name="LandScape" component={LandScapeImages} />
        <Stack.Screen name="Portrait" component={PortraitImages} />
        <Stack.Screen name="Favorites" component={FavoriteImages} />
      </Stack.Navigator>
    </NavigationContainer>
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
