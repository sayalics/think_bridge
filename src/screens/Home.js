/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import {
   FlatList,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
 } from 'react-native';
  
 import ImagePicker from "react-native-image-crop-picker";
 
 import AsyncStorage from '@react-native-async-storage/async-storage';
  
 function Home({navigation}) {
 
   const [list, setList] = useState(
     [
       { key: "Square", array:"evenImageArray"},
       { key: "Portrait", array:"portraitImageArray" },
       { key: "LandScape", array:"landscapeImageArray" },
       { key: "Favorites", array:"favImageArray"}
     ]       
   );
 
   const renderItem = (item ) => (
     <TouchableOpacity 
     onPress={() => navigation.navigate("List",{
       "key":item.key,
       "array": item.array 
     })}
     style={styles.GridViewContainer}>
       <Text style={styles.GridViewTextLayout} 
        > 
         {item.key} 
       </Text>
    </TouchableOpacity> 
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
    <SafeAreaView style={styles.Container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={"#FFFFFF"} />
         <View
           style={styles.Container}>
           <FlatList
                   data={list}
                   renderItem={ ({item}) => renderItem(item)}
                   keyExtractor={item => item.key}
                   numColumns={2}
                 />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.ButtonStyle}
                onPress={() => {openImagePicker("camera")}}>
                <Text style={styles.TextStyle}>
                    CAMERA
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.ButtonStyle}
                onPress={() => {openImagePicker("gallery")}}>
                <Text style={styles.TextStyle}>
                    GALLERY
                </Text>
            </TouchableOpacity>
         </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        margin:5,
    },
    GridViewContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        margin: 5,
        borderRadius:10,
        backgroundColor: '#B694F6'
        },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fffF',
        padding: 10,
    },
    TextStyle: {
        padding: 10,
        color: '#FFFFFF',
        fontSize:16,
        fontWeight:"bold",
        textAlign: 'center',
    },
    ButtonStyle: {
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: '#4A148C',
        padding: 5,
        borderRadius:100,
        marginVertical: 10,
        width: 250,
    },
 });
 
 export default Home;
 