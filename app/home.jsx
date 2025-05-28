import CardWrapper from "@/components/CardWrapper";
import CreateScheduleButton from "@/components/CreateScheduleButton";
import Header from "@/components/Header";
import ImageForEmptySpace from "@/components/ImageForEmptySpace";
import Colors from "@/constants/Colors";
import { useFonts } from "expo-font";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [fontsLoaded] = useFonts({
      "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
    })
    const addSchedule = ()=>alert('programme ajouté')
    return (
      <SafeAreaView style={{backgroundColor:Colors.background.light}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header/>
          <CardWrapper/>
          <Text style={{fontFamily:'Inter-Regular',marginVertical:10,fontSize:18,marginLeft:10}}>Agenda du jour</Text>  
          <ImageForEmptySpace/>
          <CreateScheduleButton imgSrc={require('../assets/images/pencil.png')} onPress={()=>addSchedule()}/>
        </ScrollView>
      </SafeAreaView>
  );
}