import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native"
import { useState } from "react";
import BoardCRUDTitle from "../Component/Board/BoardCRUDTitle";
import BoardCRUDContent from "../Component/Board/BoardCRUDContent";
import BoardCRUDInfo from "../Component/Board/BoardCRUDInfo";
import ButtonStyle from "../Style/ButtonStyle";
import ImageStyle from "../Style/Image";
import pencil from '../Image/Board/pencil.png'
const BoardCRUD = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
    const onTitleChange = (text:string) => {
        title;
        setTitle(text);
    };
    const onContentChange = (text:string) => {
        content;
        setContent(text);
    };
    return(
        <ScrollView>
            <Text style={{alignItems:"center", fontSize: 30, justifyContent:"center", marginBottom: 10}}>글 쓰기</Text>
            <BoardCRUDTitle onChangeText={onTitleChange}/>
            <BoardCRUDContent onChangeText={onContentChange}/>
            <BoardCRUDInfo/>
            <View style={{justifyContent:'center', alignItems:'center' }}>
                <TouchableOpacity style={[ButtonStyle.largeButton,ButtonStyle.achievementButton]}>
                    <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                    <Image source={pencil} style={ImageStyle.tinyImage}></Image>
                    <Text style={{fontSize:30, color:'white', fontWeight:'bold', marginLeft: 20}}>글 쓰기</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
export default BoardCRUD;