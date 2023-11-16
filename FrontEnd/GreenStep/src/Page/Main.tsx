import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Login from '../Component/Main/Login';
import Carousel from '../Component/Main/Carousel';
import styled from 'styled-components/native';
import ButtonStyle from '../Style/ButtonStyle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {MainAPI} from '../Api/basicHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseURL} from '../Api/tokenHttp';
import VictortyModal from '../Component/Main/VictoryModal';
import VictoryGetAvatarModal from '../Component/Main/VitoryGetAvatarModal';

export interface EmailLoginDataType {
  email: string;
  password: string;
}

interface VictoryProps{
  alarmId :number;
  title: string;
  content: string;
  createdAt : string;
  isReward : boolean;
}
interface WinnerAvatarProps{
  avatarImg : string;
  avatarName : string;
}

const MainTextContainer = styled.View`
  margin-top: 15%;
  margin-left: 30;
  margin-bottom: 25;
`;

const CarouselContainer = styled.View`
  margin-bottom: 20;
  height: 57%;
`;

const LoginContainer = styled.View`
  align-items: center;
`;

// 메인 텍스트 컨테이너
const CarouselTextContainer = styled.View`
  position: absolute;
  left: 30%;
  top: 60%;
  z-index: 1;
`;

const ContainerBg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;


const Main = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      console.log('토큰을 갖고 있습니다.', token);
      setIsLogin(true);
    } else {
      console.log('토큰이 없습니다.');
    }
  };

  useEffect(() => {
    checkToken();
  }, [isLogin, isFocused, ]);

  // 메인 문구 불러오기
  const [trashAmount, setTrashAmount] = useState<number>(0);
  const [travelRange, setTravelRange] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);

  const getMainData = () => {
    MainAPI.mainDataAxios()
      .then(res => {
        console.log('메인 문구 axios 성공');
        const data = res.data;
        setTrashAmount(data.trashAmount);
        setTravelRange(data.travelRange);
        setTravelTime(data.travelTime);
      })
      .catch(err => console.log('메인 데이터 axios 에러 : ', err));
  };

  useEffect(() => {
    getMainData();
    return () => {
    };
  }, [isFocused,]);

    // 경쟁 승리여부 불러오기
    const [userVictory, setUserVictory] = useState<VictoryProps[]>([])
    const [modalToggle, setModalToggle] = useState(false)
    const [rewardModalToggle, setRewardModalToggle] = useState(false)
    const [winnerAvatar, setWinnerAvatar] = useState<WinnerAvatarProps>()
    const getUserWinInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
            'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
          },
        };
        const res = await axios.get(`${baseURL}/alarm/victory`, config);
        console.log('경쟁 승리~!',res);
        setUserVictory(res.data)

      } catch (err) {
        console.log('승리 여부 조회 error', err);
      }
    };
    const getWinnerAvatar = async (alarmId : number) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 스키마를 사용한 토큰 전달
            'Content-Type': 'application/json', // JSON 형식의 컨텐츠 타입 명시
          },
        };
        const res = await axios.get(`${baseURL}/alarm/confirm/${alarmId}`, config);
        console.log(res);
        setWinnerAvatar(res.data)

      } catch (err) {
        console.log('승리 여부 조회 error', err);
      }
    };
  const closeModal = () => {
    setModalToggle(false)
    setRewardModalToggle(true)
  }
  const closeAvatarModal = () => {
    setRewardModalToggle(false)
  }
  
  useEffect(() => {
    if (isFocused) {
      getUserWinInfo()
    }
  }, [isFocused]);

  useEffect(() => {
    const hasReward = userVictory.some(victory => victory.isReward);
      if (hasReward) {
        setModalToggle(true);
    }
  }, [userVictory]);

  useEffect(() => {
    const rewardVictory = userVictory.find(victory => victory.isReward);
    if (rewardVictory) {
      getWinnerAvatar(rewardVictory.alarmId);
      setModalToggle(true);
    }
  }, [userVictory]);
  return (
    <View>
      <ContainerBg source={require('../Image/Competition/bg.png')}>
      
        <MainTextContainer>
          <Text style={styles.mainText}>자연을 지키는</Text>
          <Text style={styles.mainText}>당신과 우리의 발자국</Text>
          <Text style={styles.mainText}>그린스텝</Text>
        </MainTextContainer>

        <CarouselContainer>
          <CarouselTextContainer>
            <Text style={styles.mainFont}>자연을 지킨</Text>
            <Text style={styles.mainFont}>{travelTime} 시간</Text>
            <Text style={styles.mainFont}>{travelRange.toFixed(3)} km</Text>
          </CarouselTextContainer>
          <Carousel />
        </CarouselContainer>

        <LoginContainer>
          {isLogin ? (
            <View style={{width: '100%', alignItems: 'center'}}>
              {/* <TouchableOpacity onPress={logout}>
                <Text>로그아웃</Text>
              </TouchableOpacity> */}
              
              {modalToggle && <VictortyModal userVictory={userVictory} onClose={closeModal} visible={modalToggle}/>}
              {rewardModalToggle && <VictoryGetAvatarModal onClose={closeAvatarModal} winnerAvatar={winnerAvatar} visible={rewardModalToggle}  /> }
              <TouchableOpacity
                onPress={() => navigation.navigate('ploggingstart')}
                style={[ButtonStyle.largeButton, ButtonStyle.lightGreenColor]}>
                <Text style={styles.goToPloggingText}>플로깅 하러가기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Login setIsLogin={setIsLogin} />
          )}
        </LoginContainer>
      </ContainerBg>
    </View>
  );
};

const styles = StyleSheet.create({
  goToPloggingText: {
    fontSize: 16, 
    fontWeight: '500',
    fontFamily: 'SUITE-Bold'
  },
  mainFont: {
    fontSize: 24, 
    fontFamily: 'SUITE-Bold', 
    color: 'lightgray', 
    marginBottom: 4, 
  },
  mainText: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'SUITE-Bold',
    marginBottom: 4,
  }
})

export default Main;

  // // 임시 로그인
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  // const onChangeEmail = (e: string) => {
  //   setEmail(e)
  // }
  // const onChangePassword = (e: string) => {
  //   setPassword(e)
  // }

  /** 이메일 버튼 클릭 시 axios 요청 */
  // const emailLogin = async () => {
  //   const data: EmailLoginDataType = await {
  //     email: email,
  //     password: password
  //   }
  //   LoginAPI.getEmailLoginAxios(data)
  //   .then(res => {
  //     console.log('이메일 로그인 axios 성공 : ', res)
  //     const response = res.data;
  //     if (response.state === 200) {
  //       setIsLogin(true);
  //       AsyncStorage.setItem('accessToken', response.data.accessToken)
  //       AsyncStorage.setItem('refreshToken', response.data.refreshToken)
  //       // AsyncStorage.setItem('refreshTokenExpirationTime', response.data.refreshTokenExpirationTime)
  //     } else if (response.status === 400) {
  //       console.log(response.message)
  //     }
  //   })
  //   .catch(err => console.log('이메일 로그인 실패 : ', err))
  // }

    // const logout = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem('accessToken');
  //     const refreshToken = await AsyncStorage.getItem('refreshToken');

  //     const data = {
  //       accessToken: accessToken,
  //       refreshToken: refreshToken,
  //     };
  //     AsyncStorage.removeItem('accessToken');
  //     AsyncStorage.removeItem('refreshToken');
  //     AsyncStorage.removeItem('testToken');
  //     console.log('logout 실행');
  //     setIsLogin(false);
  //     //   tokenHttp.post('/user/logout', data)
  //     //     .then(res => {
  //     //       AsyncStorage.removeItem('accessToken');
  //     //       AsyncStorage.removeItem('refreshToken');
  //     //       setIsLogin(false);
  //     //     })
  //     //     .catch(err => console.log('로그아웃 실패 : ', err));
  //   } catch (error) {
  //     console.error('로그아웃 중 오류 발생:', error);
  //   }
  // };