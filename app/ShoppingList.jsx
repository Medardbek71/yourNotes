import NoteHeader from '@/components/NoteHeader';
import Checkbox from 'expo-checkbox';
import { useGlobalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShoppingList = () => {
  const { checkedIngredient } = useGlobalSearchParams()
  const parsingIngredient = JSON.parse(checkedIngredient)
  const [ shoppingList , setShoppingList ] = useState(parsingIngredient)
  const [ newIngredientName , setNewIngredientName ] = useState('')

    const addNewIngredient = ()=>{
      if(newIngredientName.trim() !== ''){
        const newIngredient = {
          id:Date.now(),
          name:newIngredientName ,
          checkboxState: true
        }
        setShoppingList([...shoppingList,newIngredient])
        setNewIngredientName('')
      }
      else
      {
        alert('Ajoutez un ingredient')
      }
    }
    
    const toggleIngredientState = (id) =>{
      const shoppingListCopy = JSON.parse(JSON.stringify(shoppingList))
      for (const item of shoppingListCopy) {
        if(item.id === id)
          item.checkboxState = !item.checkboxState
      }
      setShoppingList(shoppingListCopy)
    } 
  return (
<SafeAreaView style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
  <NoteHeader saveNote={null} isOpen={null}/>
  <View style={{width:'90%'}}>
  {
    shoppingList.map(ingredient => {
      return(
      <Pressable key={ingredient.id} style={styles.checkbox} onPress={()=>toggleIngredientState(ingredient.id)}>
        <View style={styles.checkboxZone}>
          <Checkbox
            value={!ingredient.checkboxState}
            onValueChange={()=>toggleIngredientState(ingredient.id)}
            color={'black'}
            />
          <Text style={{marginHorizontal:12}}>{ingredient.name}</Text>
        </View>
    </Pressable>
      )
    })
  }
      <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Pressable onPress={()=>addNewIngredient()}>
          <Text style={{fontSize:16,marginRight:5}}>+</Text>      
        </Pressable>
        <TextInput
          placeholder='Add another item'
          value = {newIngredientName} 
          onChangeText={setNewIngredientName}
        />
      </View>
    </View>
</SafeAreaView>
  )
}

export default ShoppingList

const styles = StyleSheet.create({
  checkbox:{
    display:'flex',
    flexDirection:'row',
    // justifyContent:'center'
  },
  checkboxZone:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginVertical:8
  }
})