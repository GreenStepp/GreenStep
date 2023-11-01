// import {View, Text, Button} from 'react-native';
// import React from 'react';
// import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import React, { useCallback, useState } from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from '../Component/Main/Login';


const Main = () => {

  return (
    <View>
      <Text>Main</Text>
      <Login/>
    </View>
  );
};

export default Main;