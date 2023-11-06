import axios from "axios";

//기본 axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'https://k9b303.p.ssafy.io/api',
  });

/** AVATAR API */
export const AvatarAPI = {
    /** 마이페이지 캐릭터 조회*/
    getAvatarAxios: function () {
      return axiosInstance.request({
        method: "GET",
        url: '/avatar',
      });
    },
    /** 캐릭터 선택 */
    patchAvatarAxios: function (boxId: number) {
      return axiosInstance.request({
        method: "PATCH",
        url: `/${boxId}/avatar`,
      });
    }
  }