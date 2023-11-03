//상세페이지 - 게시글 제목, 내용 컴포넌트
import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import ButtonStyle from "../../Style/ButtonStyle";
import character from '../../Image/Character/panda.png';

const DetailBoard = () => {
    const [detail, setDetail] = useState({name : '이대경', create_at: '10/26 16:45',
                                          title:'대전 3반 플로깅 하실 분?', content:'2030년 4월 20일 일과 끝나고 플로깅 하실 분 구해요~ 저는 B303의 이대경입니다.'})

    return(
        <View>
            <View style={[Box.cardBox, {marginBottom:20}]}>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: 20}}>
                        <Image source={character} style={ImageStyle.tinyImage}></Image>
                        <View>
                            <Text>{detail.name}</Text>
                            <Text>{detail.create_at}</Text>
                        </View>
                    </View>
                    <Text style={{fontWeight:'bold', marginBottom:20}}>{detail.title}</Text>
                    <Text>{detail.content}</Text>
                </View>
        </View>
    )
}

export default DetailBoard;