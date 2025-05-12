import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DynamicSection from '../components/DynamicSection';
import FloatingButton from '../components/FloatingButton';
import NoteHeader from '../components/NoteHeader';
import RecipeNoteType from '../components/RecipeNoteType';

export default function Recipe() {
  const [recipeName, setRecipeName] = useState('je ne sais pas ce que je vais écrire ici')
  const [noteIsEmpty, setNoteIsEmpty] = useState(true)
  const [recipeIsEmpty, setRecipeState] = useState(true)
  const [ingredientIsActive, setIngredient] = useState(true)
  const [instructionIsActive, setInstruction] = useState(false)
  const [instruction, setRecipeInstruction] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [ingredientList, setIngredientList] = useState([])
  const [sectionName, setSectionName] = useState('')
  const [sectionList, setSectionList] = useState([])
  const [currentSectionId, setCurrentSectionId] = useState(Date.now())
  const [dynamicSectionCounter, setDynamicSectionCounter] = useState(0)
  const [screenType , setScreenType ] = useState('noteList')
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

  const handlePress = ()=>{
    let finalSection = [...sectionList]
    if(currentSectionRef.current.title.trim() !== ''){
      finalSection = [...finalSection , currentSectionRef.current]
    }
    setScreenType('checklist')
    router.push({
      pathname:'/recipeNoteCheckbox',
      params:{'sections': JSON.stringify(finalSection)}
    })
  }
  const style = StyleSheet.create({
    textInput: {
      width: '80%',
      marginVertical: '2%',
      display: instructionIsActive === false ? 'none' : 'flex' 
    },
    dynamicSection: {
      marginTop: 20,
      width: '80%',
      display: ingredientIsActive === false ? 'none' : 'flex' 
    },
    container:{
      display: screenType === 'noteList' ? 'flex' : 'none',
      flexDirection:'column',
      justifyContent:'center',
      width:'90%',
    }
  })
  
  return (
    <View>
      <Text>Chevre</Text>
      <View style={style.container}> 
        <NoteHeader 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          saveNote={''}
          noteIsEmpty={noteIsEmpty}
        />
        {
          isOpen === true && <RecipeNoteType 
            ingredientIsActive={ingredientIsActive}
            setIngredient={setIngredient}
            instructionIsActive={instructionIsActive}
            setInstruction={setInstruction}
          />
        }
        <View style={style.dynamicSection}>              
          {renderDynamicSection()}
          
          {/* Afficher uniquement les sections qui ont été ajoutées à sectionList */}
          {sectionList.length > 0 && (
            sectionList.map((section) => {
              return(
                <View key={section.id} style={{marginBottom: 20}}>
                  <Text> ▶ {section.title}</Text>
                  {
                    section.content && section.content.length > 0 && (
                      section.content.map((ingredient, idx) => {
                        return(
                          <View key={ingredient.id || idx} style={{marginLeft: 30}}>
                            <Text> ● {ingredient.name}</Text>
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
              <Text> ▶ </Text>
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
        <View style={style.textInput}>
          <TextInput
            multiline={true}
            numberOfLines={4}  
            placeholder="Ecrivez votre note ici"
            style={{fontFamily: 'Inter-Regular', height: 100, textAlignVertical: 'top', fontSize: '20px', flex: '1', width: '100%'}}
            onChangeText={(text) => setRecipeInstruction(text)}
            value={instruction}
            />
        </View>
      </View>
        <FloatingButton name={ screenType === 'noteList' ? 'shopping-cart' : 'check'} onPress={handlePress}/>
    </View>
  )
}
