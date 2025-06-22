import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { TextInput, View } from 'react-native';
import PressableIcons from "./PressableIcons";


const NoteHeader = ({saveNote,isOpen,setIsOpen,noteTitle,setNoteTitle, noteIsEmpty , isEditMode ,noteContent , id}) => {
    const database = useSQLiteContext()
    const backButton = async()=> {
        if(isEditMode){
            try {
              const response =  await database.runAsync('UPDATE notes SET title = ? , content = ? WHERE id = ?;',[noteTitle , noteContent ,id])
                console.log('modification reussie')
                console.log(response)
            } catch (error) {
                console.log(error)
            }
            router.back()
        }else{
            router.back()
        }
    }
    const handleSubModal = () => {
        if(isOpen === true){
            setIsOpen(false)
        }else if (isOpen === false){
            setIsOpen(true)
        }
    }

  return (
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'95%', marginBottom:2}}>
        <View style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:'100%'}}>
            <View style={{width:'10%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <PressableIcons imgSrc={require('../assets/images/iconLeft.png')} onPress={backButton} color="black"/>
            </View>
            <View style={{width:'70%',paddingLeft:10}}>
                <TextInput 
                    style={{fontFamily:'Inter-Regular',paddingHorizontal:1}}
                    onChangeText={(text)=>setNoteTitle(text)}
                    value={noteTitle}
                    placeholder='untitled'
                />
            </View>
        <View style={{width:'20%',display:'flex',justifyContent:'space-around',flexDirection:'row'}}>
            <View>
                {
                    !isEditMode && (
                        <PressableIcons  
                            imgSrc={require('../assets/images/trailingIcon2.png')} 
                            onPress={handleSubModal}
                        />
                    )
                }
            </View>
            <View >
                {
                    !isEditMode &&(
                        <PressableIcons 
                            imgSrc={ noteIsEmpty === false ? require('../assets/images/trailingIcon.png') : require('../assets/images/trailingIcon_disable.png')}
                            onPress={noteIsEmpty === false ? saveNote : null}
                        />
                    )
                }
            </View>
            </View>
        </View>
    </View>

  )
}

export default NoteHeader