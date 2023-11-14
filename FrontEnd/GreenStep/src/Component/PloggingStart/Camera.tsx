import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {trashTypeMapping2} from './TrashType';
import {useTrashItem} from './Hook/useTrashItem';
const AiCamera = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const [permission, setPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const addTrashItem = useTrashItem();

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setPermission(cameraPermission === 'granted');
  };

  const sendPhotoToServer = async (photoPath: string) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const formData = new FormData();
      await formData.append('file', {
        uri: photoPath,
        type: 'multipart/form-data', // 사진의 MIME 타입
        name: 'photo.jpg', // 서버에서 필요한 파일 이름 형식에 맞추어 변경
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post(
        'https://k9b303.p.ssafy.io/api/plogging/AI', // 서버 엔드포인트 확인
        formData,
        config,
      );

      console.log('Response from server:', res.data.predicted_class);
      const name = trashTypeMapping2[res.data.predicted_class];
      console.log(name);

      addTrashItem(name);
    } catch (error) {
      console.error('Error sending photo to server:', error);
    }
  };
  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({});
        setImageSource(photo.path);
        setShowCamera(false);
        sendPhotoToServer('file://' + photo.path);
      } catch (error) {
        console.error('Error taking photo', error);
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>카메라 권한을 확인하는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showCamera && device && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.button}>
              <Text style={styles.buttonText}>사진 촬영</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {!showCamera && imageSource && (
        <Image source={{uri: `file://${imageSource}`}} style={styles.image} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default AiCamera;
