import { View, Pressable, StyleSheet ,Text} from 'react-native'
import React, { useState } from 'react'

const RecipeNoteType = ({ingredientIsActive,setIngredient,instructionIsActive,setInstruction,disable}) => {

    handleIngredient = ()=>{
        setIngredient(true)
        setInstruction(false)
    }
    handleInstruction = ()=>{
        setIngredient(false)
        setInstruction(true)    
    }
    const style = StyleSheet.create({
        noteType:{
            height:'10%',
            width:'100%',
            backgroundColor:'green'
        },
    })
  return (
    disable == undefined ?
    <View style={{display:'flex',justifyContent:'space-around',flexDirection:'row',width:'70%'}}>
        <Pressable  onPress={handleIngredient} isActive={ingredientIsActive}>
            <Text> Ingredient </Text>
            <View style={ingredientIsActive == true ? style.noteType : ''}></View>
        </Pressable>
        <Pressable onPress={ handleInstruction} isActive={instructionIsActive}>
            <Text> Instructions </Text>
        <View style={instructionIsActive == true ? style.noteType : ''}></View>
        </Pressable>
    </View>
    :
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',color:'grey'}}>
    <View>
        <Text style={{color:'grey'}}>Ingredient</Text>
        <View style={{backgroundColor:'grey',height:'10%'}}></View>
    </View>
    <View>
        <Text style={{color:'grey'}}>Instructions</Text>
    </View>
    </View>
    )
}
export default RecipeNoteType