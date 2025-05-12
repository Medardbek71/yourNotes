import { daysOfWeekMin } from "@/constants/calendar";
import Colors from '@/constants/Colors';
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
const dayjs = require('dayjs')
const isToday = require('dayjs/plugin/isToday')

dayjs.extend(isToday)

type Props = {
    dayInformations: any,
    isToday?:boolean
}

export default function DayInCalendar({ dayInformations , isToday}:Props){
    const [fontsLoaded] = useFonts({
        "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
      })
      const nameOfDay = dayInformations.toDate().getDay()
      if(dayInformations.isToday() == true) isToday = true
    const style = StyleSheet.create ({
        date:{
            fontFamily:'Inter-Regular',
            borderRadius:24,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            color: isToday == true ? Colors.text.tertiary : Colors.text.secondary,
            backgroundColor:isToday == true ? Colors.background.secondary : Colors.background.primary,
            borderColor:Colors.background.secondary,
            paddingVertical:5,
            marginHorizontal:6,
            width:42,
            height:58
        }
    })

      if(isToday == true )
        return(
            <View style={style.date}>
                <Text style={{color:'white'}}>{daysOfWeekMin[nameOfDay]}</Text>
                <Text style={{color:'white'}}>{dayInformations.$D}</Text>
            </View>
        )
        else{
            return(
                <View style={style.date}>
                    <Text>{daysOfWeekMin[nameOfDay]}</Text>
                    <Text>{dayInformations.$D}</Text>
                </View>
            )
        }
    }