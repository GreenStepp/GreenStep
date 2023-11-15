import { View, Text, Image, StyleSheet } from "react-native";
import React from 'react';
import Box from "../../Style/Box";
import Hello from '../../Image/Profile/hello.png'
import ImageStyle from "../../Style/Image";
const ProfileHeader = ({name}:any) => {

    return(
        <View style={[Box.flexRowBox, {alignItems:'center'}]}>
            <Image source={Hello} style={[{width: 180,height:70, resizeMode:'contain'}]}></Image>
            {/* <Text style={{fontSize:40, paddingLeft: 5, marginBottom:5}}>{name}</Text> */}
            <Text style={styles.profileHeaderText}>Hello! {name}</Text>

        </View>
    )
  return(
    <View>
      <Text style={styles.profileHeaderText}>Hello! {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileHeaderText: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
  }
})

export default ProfileHeader;