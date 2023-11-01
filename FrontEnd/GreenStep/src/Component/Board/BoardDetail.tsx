import React, {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Box from "../../Style/Box";
import ImageStyle from "../../Style/Image";
import ButtonStyle from "../../Style/ButtonStyle";
import character from '../../Image/Character/panda.png';

const BoardDetail = () => {
    const [joinList, setJoinList] = useState(['이대경','강경인','변민지','송원규'])
    const [detail, setDetail] = useState({name : '이대경', create_at: '10/26 16:45',
                                          title:'대전 3반 플로깅 하실 분?', content:'2030년 4월 20일 일과 끝나고 플로깅 하실 분 구해요~ 저는 B303의 이대경입니다.'})
    const [joinInfo, setJoinInfo] = useState({name: '이대경', date : '2030/04/20', member: 3})

    return(
        <ScrollView>
            <View style={{alignItems:'center'}}>
                <View style={{alignItems:'center', justifyContent:'center', margin: 20}}>
                    <Text style={{fontSize: 22, fontWeight:'bold'}}>크루 찾기</Text>
                </View>
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

                <View style={{alignItems:'center', marginBottom: 20}}>
                    <View style={[Box.cardBox,{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}]}>
                        <View>
                            <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 20}}>Information</Text>
                            <Text style={{marginBottom: 20}}>{joinInfo.name}</Text>
                            <Text style={{marginBottom: 20}}>날짜 {joinInfo.date}</Text> 
                            <Text style={{marginBottom: 20}}>인원 {joinInfo.member} / 4</Text> 
                        </View>
                        <View>
                            <Image source={character} style={ImageStyle.mediumImage}></Image>
                        </View>
                    </View>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom: 30}}>
                    <View style={{display:'flex', flexDirection:'row'}}>
                        {joinList.map((member, idx)=>(
                            <View style={{borderWidth: 3, borderColor: 'green', overflow: 'hidden',  
                                        borderRadius: 50, marginLeft: 10}}>
                                <Image source={character} style={[ImageStyle.tinyImage, {marginLeft: 5}]}></Image>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity style={[ButtonStyle.largeButton, ButtonStyle.achievementButton]}>
                    <Text style={{color:'white', fontSize:20}}>참여하기</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default BoardDetail;

