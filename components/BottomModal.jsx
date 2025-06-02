
import BottomSheet from '@gorhom/bottom-sheet'
import React, { useMemo, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BottomModal = () => {
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => [ '25%','50%','75%'], [])

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Me Voici dans la bottomSheet</Text>
          <Text style={styles.subtitle}>Glissez pour ajuster la taille</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default BottomModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handleIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    height:'500px'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
})