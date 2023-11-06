import React from 'react';
import {Image} from 'react-native';
//navigator
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//pages
import Achievement from './src/Page/Achievement';
import Board from './src/Page/Board';
import Competition from './src/Page/Competition';
import DataMap from './src/Page/DataMap';
import Main from './src/Page/Main';
import PloggingStart from './src/Page/PloggingStart';
import PloggingFinish from './src/Page/PloggingFinish';
import Profile from './src/Page/Profile';
import BoardDetail from './src/Page/BoardDetail';
import BoardCRUD from './src/Page/BoardCRUD';
import MyPlogging from './src/Page/MyPlogging';
//style
import ImageStyle from './src/Style/Image';
//Image
import home from '../GreenStep/src/Image/Footer/home.png';
import profile from '../GreenStep/src/Image/Footer/profile.png';
import competition from '../GreenStep/src/Image/Footer/competition.png';
import dataMap from '../GreenStep/src/Image/Footer/dataMap.png';
import board from '../GreenStep/src/Image/Footer/board.png';

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          borderRadius: 20,
          width: 380,
          bottom: 10,
          left: 6,
          paddingBottom: 10,
        },
        tabBarIcon(props) {
          if (route.name === '경쟁') {
            return <Image source={competition} style={ImageStyle.tinyImage} />;
          } else if (route.name === '크루 찾기') {
            return <Image source={board} style={ImageStyle.tinyImage} />;
          } else if (route.name === '메인 페이지') {
            return <Image source={home} style={ImageStyle.tinyImage} />;
          } else if (route.name === '데이터 지도') {
            return <Image source={dataMap} style={ImageStyle.tinyImage} />;
          } else if (route.name === '마이 페이지') {
            return <Image source={profile} style={ImageStyle.tinyImage} />;
          }
        },
      })}>
      <Tab.Screen name="경쟁" component={Competition} />
      <Tab.Screen name="크루 찾기" component={Board} />
      <Tab.Screen name="메인 페이지" component={Main} />
      <Tab.Screen name="데이터 지도" component={DataMap} />
      <Tab.Screen name="마이 페이지" component={Profile} />
    </Tab.Navigator>
  );
};
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="bottom" component={BottomTabScreen} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen
          name="achievement"
          component={Achievement}
          options={{
            headerShown: true,
            title: '업적',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="board"
          component={Board}
          options={{
            headerShown: true,
            title: '크루 찾기',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="boarddetail"
          component={BoardDetail}
          options={{
            headerShown: true,
            title: '크루 찾기',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="boardcrud"
          component={BoardCRUD}
          options={{
            headerShown: true,
            title: '글 쓰기',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="competition"
          component={Competition}
          options={{
            headerShown: true,
            title: '경쟁',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="datamap"
          component={DataMap}
          options={{
            headerShown: true,
            title: '데이터 지도',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="myplogging"
          component={MyPlogging}
          options={{
            headerShown: true,
            title: 'My Plogging',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="ploggingstart" component={PloggingStart} />
        <Stack.Screen name="ploggingfinish" component={PloggingFinish} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
