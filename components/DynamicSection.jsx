import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

const DynamicSection = ({ ingredientList , setIngredientList , sectionName , setSectionName }) => {
    const [ ingredientId , setIngredientId ] = useState(1)
    const [ ingredientName , setIngredientName ] = useState('')
    const handleDeletion = (id) => {
        setIngredientList(ingredientList.filter((ingredient => ingredient.id !== id)))
    }
    const addIngredient = () => {
        if(ingredientName.trim() !== ''){
            const newIngredient = {
                id: ingredientId ,
                name: ingredientName.trim(),
                checkboxState:false
            }
            setIngredientId(ingredientId+1)
            setIngredientName('')
            setIngredientList([...ingredientList,newIngredient])
        }
        else
        {
            alert('Ajoutez un ingredient')
        }
    }

    return (
        <View style={{width:'95%'}} >
            <TextInput
                onChangeText={(text)=>setSectionName(text)}
                value={sectionName}
                placeholder='enter le nom de votre section'
            />
        {
            ingredientList.map((ingredient)=>{
                return(
                    <View key={ingredient.id} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text> ● {ingredient.name}</Text>
                        <Pressable onPress={()=> handleDeletion(ingredient.id)}>
                            <Text>—</Text>
                        </Pressable>
                    </View>
                )
            })
        }
        <View style={{display:'flex',flexDirection:'row'}}>
            <Pressable onPress={()=>addIngredient()}>
               <Text>+</Text>
            </Pressable>
            <TextInput 
                value={ingredientName}
                onChangeText={(text)=>setIngredientName(text)}
                placeholder='add another ingredient'
            />
        </View>
    </View>
  )
}

export default DynamicSection