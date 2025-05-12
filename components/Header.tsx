import { currentDate, currentWeek } from "@/constants/calendar";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from "expo-font";
import { ScrollView, Text, View } from "react-native";
import DayInCalendar from "./DayInCalendar";

export default function Header(){
    const [fontsLoaded] = useFonts({
        "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
      })
      
    return (
        <View>
            <View style={{width:100,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:20}}>
                <Text style={{fontFamily:'Inter-Regular',width:350}}>{currentDate}</Text>
                <Ionicons name="settings-outline" size={24} color="black" className="w-10"/>
            </View>
            <View className="my-9 mx-4">
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
    )
}