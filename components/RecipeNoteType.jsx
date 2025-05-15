import Colors from '@/constants/Colors'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const RecipeNoteType = ({ingredientIsActive,setIngredientIsActive}) => {
    const handlePress = (id)=>{
        if(id === 1){
            setIngredientIsActive(true)
        }else{
            setIngredientIsActive(false)
        }
    }
    
    const styles = StyleSheet.create({
        recipeNoteType:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:85,
            height:40,
            marginHorizontal:20,
            marginVertical:16,
            borderBottomWidth:2,
        }
    })
  return (
    <View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}> 
            <Pressable style={[styles.recipeNoteType,{borderBlockColor: ingredientIsActive === true ? Colors.background.tertiary:Colors.background.primary}]} onPress={()=>handlePress(1)}><Text>Ingredients</Text></Pressable>
            <Pressable style={[styles.recipeNoteType,{borderBlockColor: ingredientIsActive === false ? Colors.background.tertiary:Colors.background.primary}]} onPress={()=>handlePress(2)}><Text>Instructions</Text></Pressable>
        </View>
    </View>
    )
}
export default RecipeNoteType