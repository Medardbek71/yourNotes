import Colors from '@/constants/Colors'
import Checkbox from 'expo-checkbox'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function DynamicCheckbox({items, setItems}) {
  const handleTextChange = (text, id) => {
    const updatedItems = items.map(item => item.id === id ? {...item, text} : item)
    setItems(updatedItems)
  }
  
  const handleToggle = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked} : item
    )
    setItems(updatedItems)
  }
  
  // Nouvelle fonction pour ajouter un item après un ID spécifique
  const addItemAfter = (id) => {
    const newItem = {
      id: Date.now(),
      text: '',
      checked: false
    }
    
    const currentIndex = items.findIndex(item => item.id === id)
    const newItems = [ 
      ...items.slice(0, currentIndex + 1), 
      newItem, 
      ...items.slice(currentIndex + 1) 
    ] 
    
    setItems(newItems)
  }

  return (
    <ScrollView style={{width:'100%'}}>
       <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={styles.container}
    >
      {
        items.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={item.checked}
                onValueChange={() => handleToggle(item.id)}
                color={item.checked === true ? Colors.background.secondary : undefined}
                containerStyle={styles.checkbox}
              />
              
            </View>
              <TextInput
                style={[styles.input]}
                value={item.text}
                multiline={true}
                onChangeText={(text) => handleTextChange(text, item.id)}
              /> 
            <Pressable 
              style={styles.addButton}
              onPress={() => addItemAfter(item.id)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </Pressable>
          
          </View>
        ))
      }
    </KeyboardAvoidingView>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    padding: 16,
  },
  itemContainer: {
    display:'flex',
    flexDirection: 'row',
    marginBottom: 8,
    alignItems:'center',
    width:'100%',
  },
  checkbox: {
    marginLeft: 0,
    padding: 0,
    position:'relative',
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 2,
    fontFamily:'Inter-Regular',
    textAlignVertical:'top',
    color:'black'
  },
  checkboxWrapper:{
    width:'10%',
  },
  textInputWrapper:{
    width:'75%',
  },
  addButton: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: 'black',
  }
});