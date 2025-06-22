import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const Button3D = ({ 
  title = "Appuyer", 
  onPress = () => {}, 
  width = 200, 
  height = 60,
  color = "#4CAF50",
  shadowColor = "#2E7D32" 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  const shadowOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  const shadowOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 2],
  });

  return (
    <View style={styles.container}>
      {/* Ombre du bouton */}
      <Animated.View
        style={[
          styles.shadow,
          {
            width,
            height,
            backgroundColor: shadowColor,
            opacity: shadowOpacity,
            transform: [
              {
                translateY: shadowOffset,
              },
            ],
          },
        ]}
      />
      
      {/* Bouton principal */}
      <Animated.View
        style={[
          styles.button,
          {
            width,
            height,
            backgroundColor: color,
            transform: [{ translateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.touchable, { width, height }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
          activeOpacity={1}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
        
        {/* Reflet sur le dessus */}
        <View style={[styles.highlight, { width: width - 8 }]} />
      </Animated.View>
    </View>
  );
};

// Exemple d'utilisation avec plusieurs boutons
const App = () => {
  return (
    <View style={styles.app}>
      <Text style={styles.title}>Boutons 3D React Native</Text>
      
      <Button3D
        title="Bouton Vert"
        color="#4CAF50"
        shadowColor="#2E7D32"
        onPress={() => console.log('Bouton vert pressé!')}
      />
      
      <Button3D
        title="Bouton Bleu"
        color="#2196F3"
        shadowColor="#1565C0"
        width={180}
        height={55}
        onPress={() => console.log('Bouton bleu pressé!')}
      />
      
      <Button3D
        title="Bouton Rouge"
        color="#F44336"
        shadowColor="#C62828"
        width={220}
        height={65}
        onPress={() => console.log('Bouton rouge pressé!')}
      />
      
      <Button3D
        title="Bouton Orange"
        color="#FF9800"
        shadowColor="#E65100"
        onPress={() => console.log('Bouton orange pressé!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: 'center',
  },
  shadow: {
    position: 'absolute',
    borderRadius: 12,
    zIndex: 1,
  },
  button: {
    borderRadius: 12,
    zIndex: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  highlight: {
    position: 'absolute',
    top: 4,
    left: 4,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default App;