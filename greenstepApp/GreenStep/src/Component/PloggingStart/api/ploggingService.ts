import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTrashBins = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(
    'https://k9b303.p.ssafy.io/api/plogging/trashBox',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.map((bin: any) => ({
    ...bin,
    latitude: parseFloat(bin.latitude),
    longitude: parseFloat(bin.longitude),
  }));
};

export const plogginghistory = async (ploggingId: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  const response = await axios.get(
    `https://k9b303.p.ssafy.io/api/plogging/${ploggingId}/finishMap`, // ploggingId를 동적으로 삽입
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data.map((bin: any) => ({
    ...bin,
    latitude: parseFloat(bin.latitude),
    longitude: parseFloat(bin.longitude),
  }));
};

export const sendPhotoToServer = async (photoPath: string) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('file', {
      uri: photoPath,
      type: 'multipart/form-data',
      name: 'photo.jpg',
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      'https://k9b303.p.ssafy.io/api/plogging/AI',
      formData,
      config,
    );

    return response.data;
  } catch (error) {
    console.error('Error sending photo to server:', error);
    throw error;
  }
};

export const ploggingdata = async ploggingDataInfo => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      'https://k9b303.p.ssafy.io/api/plogging/end',
      ploggingDataInfo,
      config,
    );

    return response.data;
  } catch (error) {
    console.error('Error in plogging data submission:', error);
    throw error;
  }
};
