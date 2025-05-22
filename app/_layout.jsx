import { NoteContext } from "@/contexts/NoteContext";
import { TitleContext } from "@/contexts/TitleContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootLayout() {
  const [ notes , updateNotes ] = useState([])
  const [ recipeName, setRecipeName] = useState('')


  return (
    <>
      <StatusBar 
        style='dark'
      />
      <TitleContext.Provider value={{recipeName,setRecipeName}}>
      <NoteContext.Provider value={{notes , updateNotes}}>
        <Stack
          screenOptions={{headerShown:false}}
        >
            <Stack.Screen name='home' options={{headerShown:false}}/>
            <Stack.Screen name='Note' options={{headerShown:false}}/>
            <Stack.Screen name='AddNote' options={{headerShown:false}}/>
              <Stack.Screen name='Recipe' options={{headerShown:false}}/>
              <Stack.Screen name='ShoppingList' options={{headerShown:false}}/>
        </Stack>
      </NoteContext.Provider>
      </TitleContext.Provider>
    </>
  )
}