import CardWrapper from "@/components/CardWrapper";
import CreateScheduleButton from "@/components/CreateScheduleButton";
import Header from "@/components/Header";
import ImageForEmptySpace from "@/components/ImageForEmptySpace";
import MeetingSchedule from "@/components/MeetingSchedule";
import ScheduleHeader from "@/components/ScheduleHeader";
import Colors from "@/constants/Colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  
  const [floatingActionButtonIsOpen, setFloatingActionButtonState] = useState(false)
  const [bottomSheetLevel, setBottomSheetLevel] = useState(-1)
  const [bottomSheetType, setBottomSheetType] = useState('null')
  const [floatingButtonVisibility , setFloatingButtonVisibility] = useState(true)
  const bottomSheetRef = useRef(null)
  
  const snapPoints = ['90%']

  const openBottomSheet = () => {
    setBottomSheetLevel(1)
    setFloatingActionButtonState(false)
    setFloatingButtonVisibility(false)
  }

  const closeBottomSheet = () => {
    setBottomSheetLevel(-1)
    setFloatingButtonVisibility(true)
  }

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SafeAreaView style={{backgroundColor: Colors.background.light, flex:1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header/>
          <CardWrapper/>
          <Text style={{fontFamily:'Inter-Regular',marginVertical:10,fontSize:18,marginLeft:10}}>
            Agenda du jour
          </Text>  
          <ImageForEmptySpace/>
        </ScrollView>

        {(floatingActionButtonIsOpen === true || bottomSheetLevel === 1) && 
          <Pressable onPress={()=>setFloatingActionButtonState(false)} style={{ 
            zIndex: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0, 
            bottom: 0, 
            backgroundColor:'black',
            opacity: 0.6
          }}/>
        }

        {floatingButtonVisibility === true &&
          <CreateScheduleButton
          isOpen={floatingActionButtonIsOpen}
          onPress={()=>(setFloatingActionButtonState(!floatingActionButtonIsOpen))}
          setBottomSheetType={setBottomSheetType}
          openBottomSheet={openBottomSheet}
        />}

        <BottomSheet
          ref={bottomSheetRef} 
          snapPoints={snapPoints}
          index={bottomSheetLevel}
          enablePanDownToClose={true}
          onClose={() => closeBottomSheet()}
          backgroundStyle={{backgroundColor:'white'}}
          style={{zIndex: 2}}
        >
          <BottomSheetScrollView contentContainerStyle={{justifyContent:'center'}}>
            <ScheduleHeader bottomSheetType={bottomSheetType}closeBottomSheet={closeBottomSheet}/>
            {
              bottomSheetType === 'Meeting' && <MeetingSchedule/>
            }
          </BottomSheetScrollView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}