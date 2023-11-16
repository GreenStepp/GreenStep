import React, {useState, useRef, useEffect, useReducer} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  IState,
  locationReducer,
  initialState,
} from '../Component/PloggingStart/LocationReducer';
import PloggingInfo from '../Component/PloggingStart/PloggingInfo';
import PloggingFooter from '../Component/PloggingStart/PloggingFooter';
import PloggingMap from '../Component/Common/PloggingMap';
import PloggingModal from '../Component/PloggingStart/PloggingModal';
import {requestPermission} from '../Component/PloggingStart/MapPermission';
import useModal from '../Component/PloggingStart/Hook/useModal';

const PloggingStart = () => {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  const watchId = useRef(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    requestPermission().then(result => {
      if (result) {
        watchId.current = Geolocation.watchPosition(
          position => {
            const {latitude, longitude} = position.coords;
            if (isTracking) {
              dispatch({type: 'ADD_LOCATION', payload: {latitude, longitude}});
            } else {
              dispatch({
                type: 'UPDATE_CURRENT_LOCATION',
                payload: {latitude, longitude},
              });
            }
          },
          error => console.log(error),
          {enableHighAccuracy: true, distanceFilter: 10},
        );
      }
    });

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, [isTracking]);

  const handleStartTracking = () => {
    setIsTracking(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch({
          type: 'RESET_AND_ADD_LOCATION',
          payload: {latitude, longitude},
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  const {isModalVisible, openModal, closeModal} = useModal();

  return (
    <View style={styles.container}>
      <PloggingInfo
        isTracking={isTracking}
        handlestart={handleStartTracking}
        distance={state.totalDist}
        locations={state.locations}
        setIsTracking={setIsTracking}
      />

      {state.locations.length > 0 && (
        <PloggingMap
          style={styles.ploggingMap}
          locations={state.locations}
          isTracking={isTracking}
        />
      )}

      <PloggingFooter openModal={openModal} isTracking={isTracking} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <PloggingModal onClose={closeModal} isTracking={isTracking} />
      </Modal>
    </View>
  );
};

export default PloggingStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
  },
  ploggingInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // This ensures it covers the whole screen
    height: 800,
    zIndex: 1, // Higher index to stay on top
  },
  ploggingMap: {
    flex: 1, // Take up all available space
    zIndex: 0, // Lower index to stay behind
  },
});

// // 모달
// const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
// const openModal = () => {
//   setIsModalVisible(true);
// };
// const closeModal = () => {
//   setIsModalVisible(false);
// };

//안드로이드에서 권한 갖고오기
// async function requestPermission() {
//   try {
//     if (Platform.OS === 'ios') {
//       return await Geolocation.requestAuthorization('always');
//     }
//     // 안드로이드 위치 정보 수집 권한 요청
//     if (Platform.OS === 'android') {
//       return await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// //쓰레기 통 로직 더미데이터
// function generateTrashBins(center, count) {
//   const trashBins = [];
//   const radius = 0.01; // 약 1km 반경

//   for (let i = 0; i < count; i++) {
//     const randomLatitudeOffset = (Math.random() - 0.5) * 2 * radius;
//     const randomLongitudeOffset = (Math.random() - 0.5) * 2 * radius;

//     const newLatitude = center.latitude + randomLatitudeOffset;
//     const newLongitude = center.longitude + randomLongitudeOffset;

//     trashBins.push({latitude: newLatitude, longitude: newLongitude});
//   }

//   return trashBins;
// }

// const centerTrashBin = {latitude: 36.3456, longitude: 127.2985};
// const trashBins = generateTrashBins(centerTrashBin, 50);

// interface ILocation {
//   latitude: number;
//   longitude: number;
// }

// interface IState {
//   locations: ILocation[];
//   totalDist: number;
// }
// type LocationAction = {type: 'ADD_LOCATION'; payload: ILocation};
// // 필요한 다른 액션 타입들을 여기에 추가할 수 있습니다.

// const initialState = {
//   locations: [],
//   totalDist: 0,
// };

// //거리 계산 상태관리
// const locationReducer = (state: IState, action: LocationAction): IState => {
//   switch (action.type) {
//     case 'ADD_LOCATION':
//       const newLocation = action.payload;
//       const prevLocation = state.locations[state.locations.length - 1];
//       const distance =
//         state.locations.length > 0
//           ? haversine(prevLocation, newLocation, {unit: 'meter'})
//           : 0;
//       const updatedTotalDist = state.totalDist + distance;
//       console.log('Total Distance:', updatedTotalDist); // 여기에서 거리를 출력
//       return {
//         locations: [...state.locations, newLocation],
//         totalDist: updatedTotalDist,
//       };
//     default:
//       return state;
//   }
// };
