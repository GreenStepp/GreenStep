import { View, Image, TouchableOpacity} from "react-native";
import avatar from '../../Image/Avatar/panda.png'
import ImageStyle from "../../Style/Image";
import {useState} from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProfileAvatarModal from "./ProfileAvatarModal";
import { AvatarAPI } from "../../Api/avatarApi";

const ProfileHeaderImage = ({percentage}:any) => {
    const [showAvatar, setShowAvatar] = useState(avatar)
    const [toggle, setToggle] = useState(false)
    const [avatarId, setavatarId] = useState(1)

    // 사용자 캐릭터 변경하기
    const changeAvatar = (avatarId : number) =>{
        handelAvatarId(avatarId)
        AvatarAPI.patchAvatarAxios(avatarId)
        .then((res) =>{
         console.log(res)
        // setShowAvatar(res.data)
        handleToggle();
        } 
      )
    .catch(err => console.log('사용자 캐릭터 변경 axios 에러 : ', err, avatarId))

    }
    const handleToggle = () => {
        setToggle(!toggle)
    }
    const handelAvatarId = (avatarId :number) =>{
        setavatarId(avatarId)
    }
    // console.log('exp',percentage)
    return(
        <View>
          <AnimatedCircularProgress
                size={130}
                width={5}
                fill={percentage}
                tintColor="#00e0ff"
                backgroundColor="#3d5875">
                {(fill) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={handleToggle}>
                            <Image source={showAvatar} style={ImageStyle.mediumImage}/>
                        </TouchableOpacity>
                    </View>
                )}
            </AnimatedCircularProgress>
            {toggle && <ProfileAvatarModal onSelectAvatar={changeAvatar} onClose={handleToggle} visible={toggle} />}
        </View>
    )
}
export default ProfileHeaderImage;