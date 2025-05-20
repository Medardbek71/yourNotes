import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'


const DynamicIngredientsList = ({sectionName}) => {
  const [ ingredientList , setIngredientsList ] = useState([])
  const [ ingredientName , setIngredientName ] = useState('')
  const [ ingredientId , setIngredientId ] = useState(1)

  const handleAddNewIngredient = (ingredientName)=>{
    if(ingredientName.trim() === '' || ingredientName.length === 0 ){
      alert('Ajoutez un ingredient')
      return ;
    }
    const newIngredient = {
      id:ingredientId,
      name: ingredientName
    }
    setIngredientsList([ ...ingredientList , newIngredient])
    setIngredientName('')
    setIngredientId(ingredientId + 1)
    alert('le yaourt')
  }

  const handleDeletion = (id) => {
    setIngredientsList( ingredientList.filter( ingredient => ingredient.id !== id))
  }
    return (
    <View>
      <TextInput
        placeholder='▶ Add a section'
        defaultValue={sectionName}
        style={{marginTop:20}}
      />
      {   	
        ingredientList.map((ingredient)=>{
          return( 
            <View key={ingredient.id}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Text>        ● {ingredient.name}</Text>
                <Pressable onPress={()=>handleDeletion(ingredient.id)}>
                  <Text>—</Text>
                </Pressable>
              </View>
            </View>
          )
        })
      }
      <View>
        <View style={{display:'flex',flexDirection:'row'}}>
          <Pressable onPress={()=>handleAddNewIngredient(ingredientName)}>
            <Text>        +</Text>
          </Pressable>
          <TextInput
            type = 'text'
            value = {ingredientName}
            onChangeText = {(text)=> setIngredientName(text)}
            placeholder = 'add another ingredient'
          />
        </View>
      </View>
    </View>
  )
}

export default DynamicIngredientsList