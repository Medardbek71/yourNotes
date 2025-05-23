// import NoteHeader from '@/components/NoteHeader';
// import { NoteContext } from '@/contexts/NoteContext';
// import { TitleContext } from '@/contexts/TitleContext';
// import Checkbox from 'expo-checkbox';
// import { router, useGlobalSearchParams } from 'expo-router';
// import React, { useContext, useState } from 'react';
// import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const ShoppingList = () => {
//   const parseIngredients = () => {
//     try {
//       return checkedIngredient ? JSON.parse(checkedIngredient) : [];
//     } catch (error) {
//       console.warn('Erreur lors du parsing des ingrédients:', error);
//       return [];
//     }
//   };
//   const { checkedIngredient } = useGlobalSearchParams()
//   const [ shoppingList , setShoppingList ] = useState(parseIngredients)
//   const [ newIngredientName , setNewIngredientName ] = useState('')
//   const { notes , updateNotes } = useContext(NoteContext)


//     const saveNote = () =>{
//       const newRecipe = {
//         id:Date.now(),
//         type:'recipe',
//         title:recipeName,
//         content:JSON.parse(JSON.stringify(shoppingList))
//       }
//       updateNotes([...notes,newRecipe])
//       setRecipeName('')
//       router.push('/home')
//     }

//     const addNewIngredient = ()=>{
//       if(newIngredientName.trim() !== ''){
//         const newIngredient = {
//           id:Date.now(),
//           name:newIngredientName ,
//           checkboxState: true
//         }
//         setShoppingList([...shoppingList,newIngredient])
//         setNewIngredientName('')
//       }
//       else
//       {
//         alert('Ajoutez un ingredient')
//       }
//     }
    
//     const toggleIngredientState = (id) =>{
//       const shoppingListCopy = JSON.parse(JSON.stringify(shoppingList))
//       for (const item of shoppingListCopy) {
//         if(item.id === id)
//           item.checkboxState = !item.checkboxState
//       }
//       setShoppingList(shoppingListCopy)
//     } 
//     const { recipeName , setRecipeName } = useContext(TitleContext)

//   return (
// <SafeAreaView style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
//   <NoteHeader 
//     isOpen={null}
//     noteTitle={recipeName}
//     setNoteTitle={setRecipeName}
//     noteIsEmpty={false}
//     saveNote={()=>saveNote()}
//     />
//   <View style={{width:'90%'}}>
//   {
//     shoppingList.map(ingredient => {
//       return(
//       <Pressable key={ingredient.id} style={styles.checkbox} onPress={()=>toggleIngredientState(ingredient.id)}>
//         <View style={styles.checkboxZone}>
//           <Checkbox
//             value={!ingredient.checkboxState}
//             onValueChange={()=>toggleIngredientState(ingredient.id)}
//             color={'black'}
//             />
//           <Text style={{marginHorizontal:12}}>{ingredient.name}</Text>
//         </View>
//     </Pressable>
//       )
//     })
//   }
//       <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
//         <Pressable onPress={()=>addNewIngredient()}>
//           <Text style={{fontSize:16,marginRight:5}}>+</Text>      
//         </Pressable>
//         <TextInput
//           placeholder='Add another item'
//           value = {newIngredientName} 
//           onChangeText={setNewIngredientName}
//         />
//       </View>
//     </View>
// </SafeAreaView>
//   )
// }

// export default ShoppingList

// const styles = StyleSheet.create({
//   checkbox:{
//     display:'flex',
//     flexDirection:'row',
//     // justifyContent:'center'
//   },
//   checkboxZone:{
//     display:'flex',
//     flexDirection:'row',
//     alignItems:'center',
//     marginVertical:8
//   }
// })
import NoteHeader from '@/components/NoteHeader';
import { NoteContext } from '@/contexts/NoteContext';
import { TitleContext } from '@/contexts/TitleContext';
import Checkbox from 'expo-checkbox';
import { router, useGlobalSearchParams } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShoppingList = () => {
  const { checkedIngredient } = useGlobalSearchParams()
  
  // 🔥 FIX: Gérer le cas où checkedIngredient est undefined
  const parseIngredients = () => {
    try {
      return checkedIngredient ? JSON.parse(checkedIngredient) : [];
    } catch (error) {
      console.warn('Erreur lors du parsing des ingrédients:', error);
      return [];
    }
  };
  
  const [shoppingList, setShoppingList] = useState(parseIngredients())
  const [newIngredientName, setNewIngredientName] = useState('')
  const { notes, updateNotes } = useContext(NoteContext)
  const { recipeName, setRecipeName } = useContext(TitleContext)

  const saveNote = () => {
    const newRecipe = {
      id: Date.now(),
      type: 'recipe',
      title: recipeName,
      content: JSON.parse(JSON.stringify(shoppingList))
    }
    updateNotes([...notes, newRecipe])
    setRecipeName('')
    router.push('/home')
  }

  const addNewIngredient = () => {
    if (newIngredientName.trim() !== '') {
      const newIngredient = {
        id: Date.now(),
        name: newIngredientName,
        checkboxState: true
      }
      setShoppingList([...shoppingList, newIngredient])
      setNewIngredientName('')
    } else {
      alert('Ajoutez un ingredient')
    }
  }
    
  const toggleIngredientState = (id) => {
    const shoppingListCopy = JSON.parse(JSON.stringify(shoppingList))
    for (const item of shoppingListCopy) {
      if (item.id === id)
        item.checkboxState = !item.checkboxState
    }
    setShoppingList(shoppingListCopy)
  }

  return (
    <SafeAreaView style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <NoteHeader 
        isOpen={null}
        noteTitle={recipeName}
        setNoteTitle={setRecipeName}
        noteIsEmpty={false}
        saveNote={() => saveNote()}
      />
      <View style={{width:'90%'}}>
        {/* 🔥 FIX: Vérification supplémentaire */}
        {shoppingList && shoppingList.length > 0 ? (
          shoppingList.map(ingredient => {
            return (
              <Pressable key={ingredient.id} style={styles.checkbox} onPress={() => toggleIngredientState(ingredient.id)}>
                <View style={styles.checkboxZone}>
                  <Checkbox
                    value={!ingredient.checkboxState}
                    onValueChange={() => toggleIngredientState(ingredient.id)}
                    color={'black'}
                  />
                  <Text style={{marginHorizontal:12}}>{ingredient.name}</Text>
                </View>
              </Pressable>
            )
          })
        ) : (
          <Text style={{textAlign: 'center', marginVertical: 20, color: '#666'}}>
            Aucun ingrédient dans votre liste
          </Text>
        )}
        
        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Pressable onPress={() => addNewIngredient()}>
            <Text style={{fontSize:16,marginRight:5}}>+</Text>      
          </Pressable>
          <TextInput
            placeholder='Add another item'
            value={newIngredientName} 
            onChangeText={setNewIngredientName}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ShoppingList

const styles = StyleSheet.create({
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxZone: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  }
})