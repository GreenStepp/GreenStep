import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from 'react';
import Box from "../../Style/Box";
import Hello from '../../Image/Profile/hello.png'
import TextStyle from "../../Style/Text";
const ProfileHeader = ({name}:any) => {

  return(
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={[Box.flexRowBox, {alignItems:'center'}]}>
        <Image source={Hello} style={[{width: 180,height:70, resizeMode:'contain', marginLeft: 20}]}></Image>
        <Text style={[styles.profileHeaderText, TextStyle.defaultBlack]}>{name}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileHeaderText: {
    paddingLeft: 5,
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 40,
  }
})

export default ProfileHeader;