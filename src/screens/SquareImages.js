/**
 * Sample React Native SquareImages
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   FlatList,
   SafeAreaView,
   StatusBar,
   StyleSheet,
   View,
   Image,
   Text,
   TouchableOpacity,
   Dimensions,
 } from 'react-native';
   
 import AsyncStorage from '@react-native-async-storage/async-storage';
  
 import Icon from "react-native-vector-icons/FontAwesome";

 function SquareImages() {
 
   const [list, setList] = useState([]);
   const [favImagesArray, setFavImagesArray] = useState([]);
 
   useEffect(() =>{
    async function retriveData(){
        let array = JSON.parse(await AsyncStorage.getItem('evenImageArray')) === null 
        ? [] 
        : JSON.parse(await AsyncStorage.getItem('evenImageArray'));
        setList(array);
        console.log(JSON.parse(await AsyncStorage.getItem('evenImageArray'), array));
        let array1 = JSON.parse(await AsyncStorage.getItem('favImageArray')) === null 
        ? [] 
        : JSON.parse(await AsyncStorage.getItem('favImageArray'));
        setFavImagesArray(array1);
        console.log(JSON.parse(await AsyncStorage.getItem('favImageArray'), array));
    };
    retriveData();
   },[]);

   async function onFavClick(item){
    let newArr = [...favImagesArray];

    if (newArr.includes(item)) {
      var index = newArr.indexOf(item);
      newArr.splice(index, 1);
      setFavImagesArray(newArr);
      await AsyncStorage.setItem('favImageArray', JSON.stringify(newArr));
    } else {
      newArr.push(item);
      setFavImagesArray(newArr);
      await AsyncStorage.setItem('favImageArray', JSON.stringify(newArr));
    }
  }

   const renderItem = (item ) => (
     <View style={styles.GridViewContainer}>
        <Image
           source={{uri: item}}
           resizeMode={"contain"}
           style={styles.GridViewTextLayout}
         />
        {favImagesArray.includes(item) ? (
        <TouchableOpacity
            style={styles.IconView}
            onPress={() => onFavClick(item)}
        >
            <Icon
                size={24}  
                color={"#FF0000"}              
                name={"heart"}
            />
        </TouchableOpacity>
        ) : (
        <TouchableOpacity
            style={styles.IconView}
            onPress={() => onFavClick(item)}
        >
            <Icon
                color={"#FFFFFF"} size={24}
                name={"heart-o"}
            />
        </TouchableOpacity>
        )}
    </View> 
 ); 
   
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
                   ListEmptyComponent={
                    <View>
                        <Text style={{color:"#FF0000", fontSize:14}}>No Images</Text>
                    </View>
                   }
                 />
         </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        margin:5,
        alignItems:'center'
    },
    Title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle:'normal',
        color:"#0A0AFF",
        marginVertical:10,
    },
    GridViewContainer: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height:Dimensions.get("screen").width / 2 - 20,
        width:Dimensions.get("screen").width / 2 - 20,
        margin: 5,
        backgroundColor:"#F3E5F5",
        borderRadius:10,
    },
    GridViewTextLayout: {
        borderRadius:10,
        width:"100%",
        height:"100%",
    },
    IconView:{
        position: "absolute",
        top: 10,
        borderRadius: 100,
        padding: 5,
        right: 10,            
    },
 });
 
 export default SquareImages;
 