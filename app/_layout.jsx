import { NoteContext } from "@/contexts/noteContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootLayout() {
  const [ notes , updateNotes ] = useState([])

  return (
    <>
      <StatusBar 
        style='dark'
      />
      <NoteContext.Provider value={{notes , updateNotes}}>
        <Stack
          screenOptions={{headerShown:false}}
        >
            <Stack.Screen name='home' options={{headerShown:false}}/>
            <Stack.Screen name='Note' options={{headerShown:false}}/>
            <Stack.Screen name='Recipe' options={{headerShown:false}}/>
            <Stack.Screen name='AddNote' options={{headerShown:false}}/>
        </Stack>
      </NoteContext.Provider>
    </>
  )
}