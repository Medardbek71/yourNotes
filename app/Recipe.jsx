import NoteHeader from '@/components/NoteHeader';
import RecipeNoteType from '@/components/RecipeNoteType';
import Colors from '@/constants/Colors';
import { Checkbox } from 'expo-checkbox';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicSection from '../components/DynamicSection';
import FloatingButton from '../components/FloatingButton';

export default function Recipe() {
  const [recipeName, setRecipeName] = useState('je ne sais pas ce que je vais écrire ici')
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
//   const [alertIsVisible , setAlertIsVisible ] = useState(false)
  
  const renderDynamicSection = () => {
    const sections = []
    for (let i = 0; i < dynamicSectionCounter; i++) {
      sections.push(<DynamicSection key={i} />)
    }
    return sections
  }
  
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

  let finalSection = [...sectionList]

  const handlePress = ()=>{
    if(currentSectionRef.current.title.trim() !== ''){
      finalSection = [...finalSection , currentSectionRef.current]
    }
    setDisplaySections(finalSection)

    if(screenType === 'noteList'){
      setScreenType('checklist')
    }
    else{
      setScreenType('noteList')
    }
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
      display:'flex',
      flexDirection:'row',
      marginHorizontal:8
    }
  })

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}> 
        <NoteHeader 
          isOpen={isOpen}   
          setIsOpen={setIsOpen}
          saveNote={''}
          noteIsEmpty={noteIsEmpty}
        />
        {
          isOpen === true && <RecipeNoteType 
            ingredientIsActive={ingredientIsActive}
            setIngredientIsActive={setIngredientIsActive}
          />
        }
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
          <View>
          <Text>×Select ingredient add to shopping list</Text>
          {
            displaySections.map(section => {
              return(
                <View key={section.id}>
                  <Text style={{fontWeight:'bold'}}>▶ {section.title}</Text>
                  {
                    section.content.map((item =>{
                      return(
                        <Pressable key={item.id} style={style.checkbox} onPress={()=>toggleCheckboxState(item.id)}>
                          <Checkbox
                            value={item.checkboxState}
                            onValueChange={()=>toggleCheckboxState(item.id)}
                            color={item.checked === true ? Colors.background.secondary : undefined}
                          />
                          <Text>{item.name}</Text>
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
        <FloatingButton 
          imgSrc={ screenType === 'noteList' ? require('../assets/images/shopping-cart.png') : require('../assets/images/check.png')}
          onPress={()=>handlePress()}
        />
    </SafeAreaView>
  )
}
