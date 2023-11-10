//상세페이지 - 참여하기 이미지 컴포넌트

import { View, Text, Image } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import avatar from '../../Image/Avatar/panda.png';

const BoardInfoParticipationDetail =() => {
    return(
        <View style={{borderWidth: 3, borderColor: 'green', overflow: 'hidden',  
                      borderRadius: 50, marginLeft: 10}}>
            <Image source={avatar} style={[ImageStyle.tinyImage, {marginLeft: 5}]}></Image>
        </View>
    )
}
export default BoardInfoParticipationDetail;