import { TitleContext } from "@/contexts/TitleContext";
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootLayout() {
  const [ recipeName, setRecipeName] = useState('')
  const createDbIfNeeded =  async(db) =>{
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(255) NOT NULL ,
          type VARCHAR(20) NOT NULL CHECK (type IN ('normal', 'checklist', 'recipe')),
          content TEXT
        );`
      );

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS items(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          note_id INTEGER NOT NULL ,
          name VARCHAR(255) NOT NULL ,
          is_checked BOOLEAN DEFAULT 0 ,
          FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE
        )
    `)
    console.log('notes database table successfully')
    } catch (error) {
      console.error('database creation error:',error)
    }
  }


  return (
    <>
      <StatusBar style='dark'/>
      <TitleContext.Provider value={{recipeName,setRecipeName}}>
        <SQLiteProvider
          databaseName="yourNotesDb.db" onInit={createDbIfNeeded}
        >
        <Stack
          screenOptions={{headerShown:false}}
          >
          <Stack.Screen name='home' options={{headerShown:false}}/>
          <Stack.Screen name='Note' options={{headerShown:false}}/>
          <Stack.Screen name='AddNote' options={{headerShown:false}}/>
          <Stack.Screen name='Recipe' options={{headerShown:false}}/>
          <Stack.Screen name='ShoppingList' options={{headerShown:false}}/>
        </Stack>
          </SQLiteProvider>
      </TitleContext.Provider>
    </>
  )
}