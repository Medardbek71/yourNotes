import Colors from '@/constants/Colors'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const RecipeNoteType = ({ingredientIsActive,setIngredientIsActive,disabled}) => {
    if(disabled === undefined){
        disabled = false
    }
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
        },
        text:{
            color: disabled === true ? Colors.background.disabled :'black'
        }
    })
  return (
    <View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}> 
            <Pressable 
                style={[styles.recipeNoteType,{borderBlockColor: disabled === true ? Colors.background.disabled : ingredientIsActive === true ? Colors.background.tertiary:Colors.background.primary}]} 
                onPress={()=>handlePress(1)}
                disabled={disabled}
                >
                    <Text style={styles.text}>Ingredients</Text>
            </Pressable>
            <Pressable 
                style={[styles.recipeNoteType,{borderBlockColor: ingredientIsActive === false ? Colors.background.tertiary:Colors.background.primary}]} 
                onPress={()=>handlePress(2)}
                disabled={disabled}
                >
                    <Text style={styles.text}>Instructions</Text>
            </Pressable>
        </View>
    </View>
    )
}
export default RecipeNoteType
