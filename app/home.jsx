import CardWrapper from "@/components/CardWrapper";
import FloatingButton from "@/components/FloatingButton";
import Header from "@/components/Header";
import ImageForEmptySpace from "@/components/ImageForEmptySpace";
import Colors from "@/constants/Colors";
import { noteContext } from "@/contexts/noteContext";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [fontsLoaded] = useFonts({
      "Inter-Regular": require('../assets/fonts/Inter_28pt-Regular.ttf')
    })
  const [modalIsOpen,setModalState] = useState(false)
      const [ notes , updateNotes ] = useState([])
      const noteContextValue = {
        notes:notes,
        updateNotes:updateNotes
      }

      const addNote =() => router.push('/AddNote')

    return (
      <noteContext.Provider value={noteContextValue}>
        <SafeAreaView style={{backgroundColor:Colors.background.light}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header/>
            <CardWrapper setModalState={setModalState} />
            <Text style={{fontFamily:'Inter-Regular',marginVertical:10,fontSize:18,marginLeft:10}}>Agenda du jour</Text>  
            <ImageForEmptySpace/>
            <FloatingButton imgSrc={require('../assets/images/fab.png')} onPress={()=>addNote()}/>
          </ScrollView>
        </SafeAreaView>
      </noteContext.Provider>
  );
}