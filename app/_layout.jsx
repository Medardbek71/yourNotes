import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
    <StatusBar 
      statusBarStyle = 'light'
      style={{statusBarStyle:'dark'}}
    />
    <Stack
      screenOptions={{headerShown:false}}
    >
      <Stack.Screen name='home' options={{headerShown:false}}/>
      <Stack.Screen name='Note' options={{headerShown:false}}/>
      <Stack.Screen name='Recipe' options={{headerShown:false}}/>
      <Stack.Screen name='AddNote' options={{headerShown:false}}/>
    </Stack>
    </>
    
  )
}