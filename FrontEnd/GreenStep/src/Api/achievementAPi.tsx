import axios from "axios";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://k9b303.p.ssafy.io/api',
  });

/** ACHIEVEMENT API */
export const AchievementAPI = {
    /** 업적 조회*/
    getAchievementAxios: function (achieveType : number) {
      return axiosInstance.request({
        method: "GET",
        url: `/achieve/${achieveType}`,
      });
    },
  }