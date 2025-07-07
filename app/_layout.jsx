import { TitleContext } from "@/contexts/TitleContext";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function RootLayout() {
  const [recipeName, setRecipeName] = useState("");
  const createDbIfNeeded = async (db) => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(255) NOT NULL ,
          type VARCHAR(20) NOT NULL CHECK (type IN ('normal', 'checklist', 'recipe')),
          content TEXT
        );`);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          note_id INTEGER NOT NULL ,
          name VARCHAR(255) NOT NULL ,
          is_checked BOOLEAN DEFAULT 0 ,
          FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE
        )
    `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS schedule (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255),
          time TIME ,
          date DATETIME ,
          type VARCHAR(255) NOT NULL ,
          place VARCHAR(255) ,
          link VARCHAR(255) ,
          collaboratorList VARCHAR(255) ,
          attachedNote VARCHAR(255) ,
          trackedDay VARCHAR(255) 
        )
    `);
      console.log("notes database table successfully");
    } catch (error) {
      console.error("database creation error:", error);
    }
  };

  // SQLite.deleteDatabaseAsync("yourNotesDb.db");

  return (
    <>
      <StatusBar style="dark" />
      <TitleContext.Provider value={{ recipeName, setRecipeName }}>
        <SQLiteProvider databaseName="yourNotesDb.db" onInit={createDbIfNeeded}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="Note" options={{ headerShown: false }} />
            <Stack.Screen name="AddNote" options={{ headerShown: false }} />
            <Stack.Screen name="Recipe" options={{ headerShown: false }} />
            <Stack.Screen
              name="ShoppingList"
              options={{ headerShown: false }}
            />
          </Stack>
        </SQLiteProvider>
      </TitleContext.Provider>
    </>
  );
}
