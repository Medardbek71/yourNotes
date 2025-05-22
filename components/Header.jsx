import { currentDate, currentWeek } from "@/constants/calendar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from "expo-font";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DayInCalendar from "./DayInCalendar";

export default function Header(){
    const [fontsLoaded] = useFonts({
        "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
      })

      const style = StyleSheet.create({
        calendar:{
            width:'95%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginBottom:10
        }
      })
      
    return (
        <View>
            <View style={{width:100,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:20}}>
                <Text style={{fontFamily:'Inter-Regular',width:350}}>{currentDate}</Text>
                <Ionicons name="settings-outline" size={24} color="black" className="w-10"/>
            </View>
            <View style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

            <View style={style.calendar}>
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    {  
                        currentWeek.map((day,index)=>(
                            <View key={index}>
                                <DayInCalendar dayInformations={day}></DayInCalendar>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            </View>
        </View>
    )
}