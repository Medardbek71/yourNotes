import { useGlobalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const ShoppingList = () => {
  const { checkedIngredient } = useGlobalSearchParams()
  console.log(JSON.parse(checkedIngredient))
  return (
<SafeAreaView>
    <View>
      <Text>{checkedIngredient}</Text>
    </View>
</SafeAreaView>
  )
}

export default ShoppingList

const styles = StyleSheet.create({})