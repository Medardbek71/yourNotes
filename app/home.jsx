import AppointmentSchedule from "@/components/Appointment";
import CardWrapper from "@/components/CardWrapper";
import CreateScheduleButton from "@/components/CreateScheduleButton";
import DeadLineSchedule from "@/components/DeadLineSchedule";
import EventSchedule from "@/components/EventSchedule";
import Header from "@/components/Header";
import ImageForEmptySpace from "@/components/ImageForEmptySpace";
import MeetingSchedule from "@/components/MeetingSchedule";
import ScheduleHeader from "@/components/ScheduleHeader";
import TrackerSchedule from "@/components/TrackerSchedule";
import Colors from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [floatingActionButtonIsOpen, setFloatingActionButtonState] =
    useState(false);
  const [bottomSheetLevel, setBottomSheetLevel] = useState(-1);
  const [bottomSheetType, setBottomSheetType] = useState("null");
  const [floatingButtonVisibility, setFloatingButtonVisibility] =
    useState(true);

  const bottomSheetRef = useRef(null);

  const snapPoints = ["90%", "65%"];

  const setBottomSheetSnapPoint = () => {};
  setBottomSheetSnapPoint();

  const openBottomSheet = () => {
    setBottomSheetLevel(0);
    setFloatingActionButtonState(false);
    setFloatingButtonVisibility(false);
  };

  const closeBottomSheet = () => {
    setBottomSheetLevel(-1);
    setFloatingButtonVisibility(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ backgroundColor: Colors.background.light, flex: 1 }}
        edges={["top", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <Header />
          <CardWrapper />
          <Text
            style={{
              fontFamily: "Inter-Regular",
              marginVertical: 10,
              fontSize: 18,
              marginLeft: 20,
            }}
          >
            Agenda du jour
          </Text>
          <ImageForEmptySpace />
        </ScrollView>

        {(floatingActionButtonIsOpen || bottomSheetLevel === 0) && (
          <Pressable
            onPress={() => setFloatingActionButtonState(false)}
            style={{
              zIndex: 0,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black",
              opacity: 0.6,
            }}
          />
        )}

        {floatingButtonVisibility && (
          <CreateScheduleButton
            isOpen={floatingActionButtonIsOpen}
            onPress={() =>
              setFloatingActionButtonState(!floatingActionButtonIsOpen)
            }
            setBottomSheetType={setBottomSheetType}
            openBottomSheet={openBottomSheet}
          />
        )}

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={
            bottomSheetType === "Meeting" ? [snapPoints[0]] : [snapPoints[1]]
          }
          index={bottomSheetLevel}
          enablePanDownToClose={true}
          onClose={() => closeBottomSheet()}
          backgroundStyle={{ backgroundColor: "white" }}
          enableDynamicSizing={false}
          style={{ zIndex: 2 }}
          handleIndicatorStyle={{
            backgroundColor: Colors.background.disabled,
            width: 120,
            height: 3,
          }}
          nestedScrollEnabled={true}
          closeBottomSheet={closeBottomSheet}
        >
          <ScheduleHeader bottomSheetType={bottomSheetType} />
          {bottomSheetType === "Meeting" && <MeetingSchedule />}
          {bottomSheetType === "Appointment" && <AppointmentSchedule />}
          {bottomSheetType === "Deadline" && <DeadLineSchedule />}
          {bottomSheetType === "Event" && <EventSchedule />}
          {bottomSheetType === "Tracker" && <TrackerSchedule />}
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
