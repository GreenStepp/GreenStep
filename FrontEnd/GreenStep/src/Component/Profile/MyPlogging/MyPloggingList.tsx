import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState} from 'react';
import avatar from '../../../Image/Avatar/bird.png';
import ImageStyle from '../../../Style/Image';
import MyPloggingDetail from './MyPloggingDetail';
const MyPloggingList = () => {
    const [images, setImages] = useState([avatar, avatar, avatar, avatar, avatar, avatar, avatar, avatar])
    const [toggle, setToggle] = useState(false)
    const handleToggle = () => {
        setToggle(!toggle)
    }
    return(
        <View>
            <ScrollView horizontal={false}>
                <View style={styles.wrapRow}>
                    {images.map((image, index) => (
                        <TouchableOpacity onPress={handleToggle}>
                            <View>
                                <Image key={index} source={image} style={ImageStyle.mediumImage} />
                                <View style={[styles.overlayText, styles.noWrapRow]}>
                                    <Text style={styles.textStyle}>28:57</Text>
                                    <Text style={styles.textStyle}>5.06 KM</Text>
                                    <Text style={styles.textStyle}>5'43"</Text>
                            </View>
                            </View>
                        </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
            {toggle && <MyPloggingDetail onClose={handleToggle} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        
    },
    noWrapRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
    },
    overlayText: {
        position: 'absolute',
        bottom: 0, // 위치를 조정하세요
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 텍스트 배경 투명도 조정
        padding: 5,
    },
    textStyle: {
        color: 'black', // 텍스트 색상은 적절하게 조정하세요
        textAlign: 'center', // 텍스트 정렬 방식 조정
        fontSize: 10
    },
});
export default MyPloggingList;