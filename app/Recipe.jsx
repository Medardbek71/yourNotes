import FloatingButton from '@/components/FloatingButton';
import NoteHeader from '@/components/NoteHeader';
import RecipeNoteType from '@/components/RecipeNoteType';
import Colors from '@/constants/Colors';
import { TitleContext } from '@/contexts/TitleContext';
import { Checkbox } from 'expo-checkbox';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicSection from '../components/DynamicSection';
import SpecialFloatingButton from '../components/SpecialFoatingButton';

export default function Recipe() {
  const [noteIsEmpty, setNoteIsEmpty] = useState(true)
  const [recipeIsEmpty, setRecipeState] = useState(true)
  const [ingredientIsActive, setIngredientIsActive] = useState(true)
  const [instructionIsActive, setInstruction] = useState(false)
  const [instruction, setRecipeInstruction] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [ingredientList, setIngredientList] = useState([])
  const [sectionName, setSectionName] = useState('')
  const [sectionList, setSectionList] = useState([])
  const [currentSectionId, setCurrentSectionId] = useState(Date.now())
  const [dynamicSectionCounter, setDynamicSectionCounter] = useState(0)
  const [screenType , setScreenType ] = useState('noteList') 
  const [displaySections , setDisplaySections ] = useState([])
  const [someItemsAreChecked , setSomeItemsAreChecked ] = useState(false)
  
  const renderDynamicSection = () => {
    const sections = []
    for (let i = 0; i < dynamicSectionCounter; i++) {
      sections.push(<DynamicSection key={i} />)
    }
    return sections
  }

  const { recipeName , setRecipeName } = useContext(TitleContext)
  
  const currentSectionRef = useRef({
    id: currentSectionId ,
    title: '' ,
    content: []
  })

  useEffect(()=>{
    currentSectionRef.current = {
      id: currentSectionId ,
      title: sectionName ,
      content: [...ingredientList]
    }
  },[sectionName , ingredientList , currentSectionId])

  const addNewSection = () =>{
    if(sectionName.trim() !== '')
    setSectionList(prevList => [...prevList ,currentSectionRef.current])
    setIngredientList([])
    setSectionName('')

    const newId = Date.now()
    setCurrentSectionId(newId)

    currentSectionRef.current = {
      id: currentSectionId ,
      title: '',
      content: []
    };
  }

  const goToShoppingList = ()=>{
    let checkedIngredients = []
    for (const section of displaySections) {
      for (const item of section.content) {
        if(item.checkboxState === true){
          checkedIngredients.push(item)
        }
      }
    }
    router.push({
      pathname:'/ShoppingList',
      params:{'checkedIngredient':JSON.stringify(checkedIngredients)}
    })
  }
  const handlePress = ()=>{
    const savedCurrentSectionId = currentSectionId

    if (screenType === 'noteList') {
      let finalSection = [...sectionList]
      
      if (currentSectionRef.current.title.trim() !== '') {
        finalSection = [...finalSection, currentSectionRef.current]
      }
      
      // Préserver les états de cases cochées lors des transitions entre écrans
      const sectionsWithCheckboxState = finalSection.map(section => {
        return {
          ...section,
          content: section.content.map(item => {
            // Rechercher si cet élément existe déjà dans displaySections et a un état de case cochée
            let checkboxState = false
            
            for (const existingSection of displaySections) {
              const existingItem = existingSection.content.find(
                existingItem => existingItem.id === item.id
              )
              
              if (existingItem && existingItem.checkboxState) {
                checkboxState = existingItem.checkboxState
                break
              }
            }
            
            return {
              ...item,
              checkboxState: checkboxState || false
            }
          })
        }
      })
      setDisplaySections(sectionsWithCheckboxState)
      setScreenType('checklist')
    } else {
      // Si on passe de checklist à noteList, garder les données de displaySections intactes
      setScreenType('noteList')
    }
    setCurrentSectionId(savedCurrentSectionId)
  }

  const toggleCheckboxState = (id)=>{
    const updatedSections = JSON.parse(JSON.stringify(displaySections))
    for (const sections of updatedSections) {
      for (const item of sections.content) {
        if(item.id === id)
          item.checkboxState = !item.checkboxState
      }
    }
    setDisplaySections(updatedSections)
  }
  
  useEffect(()=>{
    const checkIfSomeCheckboxAreChecked = ()=>{
      for (const section of displaySections) {
        for (const item of section.content) {
          if(item.checkboxState === true){
            setSomeItemsAreChecked(true)
            return
          }
        }
      }
      setSomeItemsAreChecked(false)
    }
    checkIfSomeCheckboxAreChecked()
  },[displaySections])
        
  const style = StyleSheet.create({
    container:{
      display: screenType === 'noteList' ? 'flex' : 'none',
      flexDirection:'column',
      justifyContent:'center',
      width:'90%',
      flex:1,
      backgroundColor:'yellow',
    },
    textInput: {
      width: '80%',
      marginVertical: '2%',
      display: instructionIsActive === false ? 'none' : 'flex' 
    },
    dynamicSection: {
      marginTop: 20,
      width: '90%',
      display: ingredientIsActive === false ? 'none' : 'flex' ,
    },
    checkbox :{
      marginLeft:16,
      
    },
    label:{
      marginHorizontal:12,
    },
    ingredient:{
      display:'flex',
      flexDirection:'row',
      marginVertical:4
    },
    checkboxView:{
      width:'100%'
    },
    pressable:{
      backgroundColor:Colors.background.tertiary,
      width:'90%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      height:'5%',
      borderRadius:150,
      marginTop:15
    }
  })
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}> 
         { 
          screenType === 'noteList' && someItemsAreChecked === false && <NoteHeader 
          isOpen={isOpen}
          noteTitle={recipeName}
          setNoteTitle={setRecipeName}
          setIsOpen={setIsOpen}
          saveNote={''}
          noteIsEmpty={noteIsEmpty}
          />
          }
          { screenType=== 'noteList' ? 
            someItemsAreChecked === true &&
            <Pressable style={style.pressable} onPress={()=>goToShoppingList()}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:Colors.background.primary}}>Added to the new shopping list.View here </Text>
                <Image 
                  source={require('../assets/images/chevron-right.png')}
                  style={{width:16,height:16}}
                />
              </View>
            </Pressable>
          : <View style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}> 
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <View><Text style={{fontSize:40,marginRight:10}}>×</Text></View>
              <View><Text style={{fontWeight:'bold',fontSize:15}}>Select ingredients add to shopping list</Text></View>
            </View>
          </View>}
        {
          isOpen === true && <RecipeNoteType 
          ingredientIsActive={ingredientIsActive}
          setIngredientIsActive={setIngredientIsActive}
          disabled={ screenType === 'checklist' ? true : false }
          />
        }
       { console.log(someItemsAreChecked)}
        {
          screenType === 'noteList' ? 
          <View style={style.dynamicSection}>              
          {renderDynamicSection()}

          {/* Afficher uniquement les sections qui ont été ajoutées à sectionList */}
          {sectionList.length > 0 && (
            sectionList.map((section) => {
              return(
                <View key={section.id} style={{marginBottom: 20}}>
                  <Text style={{marginBottom:10 , color:'black', fontWeight:'bold'}}> ▶ {section.title}</Text>
                  {
                    section.content && section.content.length > 0 && (
                      section.content.map((ingredient, idx) => {
                        return(
                          <View key={ingredient.id || idx}>
                            <Text style={{marginLeft:16,marginTop:1}}> ● {ingredient.name}</Text>
                          </View>
                        )
                      })
                    )
                  }
                </View>
              )
            })
          )}
          
          <View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <DynamicSection 
                setSectionsList={setSectionList}
                ingredientList={ingredientList}
                setIngredientList={setIngredientList}
                sectionName={sectionName}
                setSectionName={setSectionName}
                />
            </View>
            <Pressable style={{marginTop: 30}} onPress={addNewSection}>
              <Text>+ Add new section</Text>
            </Pressable>
          </View>
        </View>
          : 
          <View style={{width:'90%'}}>
          {
            
            displaySections.map(section => {
              return(
                <View style={style.checkboxView} key={section.id}>
                  <Text style={{fontWeight:'bold',marginTop:8}}>▶ {section.title}</Text>
                  {
                    section.content.map((item =>{
                      return(
                        <Pressable key={item.id} style={style.ingredient} onPress={()=>toggleCheckboxState(item.id)}>
                          <Checkbox
                            value={item.checkboxState}
                            onValueChange={()=>toggleCheckboxState(item.id)}
                            style={style.checkbox}
                            color={'black'}
                            />
                          <Text style={style.label}>{item.name}</Text>
                        </Pressable>
                      )
                    }))
                  }
                </View>
              )
            })
          }
          </View>
        }
        <View style={style.textInput}>
          <TextInput
            multiline={true}
            numberOfLines={4}  
            placeholder="Ecrivez votre note ici"
            style={{fontFamily: 'Inter-Regular', height: 100, textAlignVertical: 'top', fontSize: 20, flex: '1', width: '100%'}}
            onChangeText={(text) => setRecipeInstruction(text)}
            value={instruction}
            />
        </View>
      </View>
      {
        screenType === 'noteList' ? 
        <FloatingButton
        imgSrc={ require('../assets/images/shopping-cart.png')}
        onPress={()=>handlePress()}
        />
        : 
        <SpecialFloatingButton 
          imgSrc={require('../assets/images/check.png')}
          onPress={()=>handlePress()}
          toggledValue = {someItemsAreChecked}
          />
      }
    </SafeAreaView>
  )
}