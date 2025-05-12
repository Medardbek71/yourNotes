import AddNoteModal from "@/components/AddNoteModal";
import CardWrapper from "@/components/CardWrapper";
import FloatingButton from "@/components/FloatingButton";
import Header from "@/components/Header";
import ImageForEmptySpace from "@/components/ImageForEmptySpace";
import { noteContext } from "@/contexts/noteContext";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
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

      const addNote =() => useRouter.push('/addNote')

    return (
      <noteContext.Provider value={noteContextValue}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header/>
            <CardWrapper setModalState={setModalState} />
            <Text className="text-xl mx-4" style={{fontFamily:'Inter-Regular'}}>Agenda du jour</Text>  
            <ImageForEmptySpace/>
            <FloatingButton name={'pencil'} onPress={()=>addNote()}/>
            <AddNoteModal modalIsOpen={modalIsOpen} setModalState={setModalState}/>
          </ScrollView>
        </SafeAreaView>
      </noteContext.Provider>
  );
}