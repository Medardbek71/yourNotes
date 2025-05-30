import CardWrapper from "@/components/CardWrapper";
import CreateScheduleButton from "@/components/CreateScheduleButton";
import Header from "@/components/Header";
import ImageForEmptySpace from "@/components/ImageForEmptySpace";
import Colors from "@/constants/Colors";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [ isOpen , setState ] = useState(false)

    const [fontsLoaded] = useFonts({
      "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
    })
    const handlePress = ()=>{
      setState(!isOpen)
      console.log(isOpen)
    }
    return (
      <SafeAreaView style={{backgroundColor:Colors.background.light , flex:1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header/>
          <CardWrapper/>
          <Text style={{fontFamily:'Inter-Regular',marginVertical:10,fontSize:18,marginLeft:10}}>Agenda du jour</Text>  
          <ImageForEmptySpace/>
        </ScrollView>
        {isOpen === true && 
          <View style={{ zIndex: 1,position: 'absolute',top: 0,left: 0,right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}> 
          </View>
        }
          <CreateScheduleButton isOpen={isOpen} setState={setState} onPress={()=>handlePress()}/>
      </SafeAreaView>
  );
}