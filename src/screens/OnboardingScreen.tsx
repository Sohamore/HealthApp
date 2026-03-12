import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import { Theme } from '../theme';
import SlideButton from '../components/SlideButton';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const COLORS = {
  darkNavy: '#0B0F2F',
  medicalGreen: '#8ED081',
  lightGreenAccent: '#B8E994',
  backgroundGrey: '#F5F5F5',
  white: '#FFFFFF',
  textGrey: '#666',
};

const BackgroundDecorations = () => (
  <View style={StyleSheet.absoluteFill}>
    {/* Plus symbols */}
    <Feather name="plus" size={32} color={COLORS.medicalGreen} style={[styles.bgShape, { top: height * 0.05, left: width * 0.4, opacity: 0.3 }]} />
    <Feather name="plus" size={48} color={COLORS.medicalGreen} style={[styles.bgShape, { top: height * 0.25, right: 30, opacity: 0.2 }]} />
    <Feather name="plus" size={24} color={COLORS.medicalGreen} style={[styles.bgShape, { bottom: height * 0.45, left: width * 0.1, opacity: 0.3 }]} />
    
    {/* Diamonds/Rectangles */}
    <View style={[styles.bgShape, styles.diamond, { top: height * 0.15, right: width * 0.15, width: 14, height: 14, transform: [{ rotate: '45deg' }] }]} />
    <View style={[styles.bgShape, styles.diamond, { top: height * 0.45, right: width * 0.05, width: 12, height: 12, transform: [{ rotate: '45deg' }] }]} />
    
    {/* Circles */}
    <View style={[styles.bgShape, styles.circle, { top: height * 0.1, left: width * 0.1, width: 80, height: 80 }]} />
    <View style={[styles.bgShape, styles.circle, { top: height * 0.35, left: -20, width: 60, height: 60 }]} />
  </View>
);

const OnboardingScreen = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundDecorations />
      
      <View style={styles.topSection}>
        <Animated.Image 
          entering={FadeInUp.delay(200)}
          source={{ uri: 'https://img.freepik.com/free-vector/doctor-character-holding-medicine-first-aid-kit_23-2148464654.jpg' }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Animated.View 
        entering={FadeInDown.delay(400)}
        style={styles.card}
      >
        <Text style={styles.title}>Care Made Simple</Text>
        <Text style={styles.description}>
          Whether at home, at work, or on the go, find experienced doctors, schedule appointments in seconds.
        </Text>

        <View style={styles.buttonWrapper}>
          <SlideButton title="Get started" onComplete={handleComplete} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGrey,
  },
  bgShape: {
    position: 'absolute',
  },
  diamond: {
    backgroundColor: COLORS.medicalGreen,
    opacity: 0.2,
  },
  circle: {
    backgroundColor: COLORS.medicalGreen,
    opacity: 0.2,
    borderRadius: 100,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: width * 0.85,
    height: height * 0.45,
  },
  card: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.darkNavy,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter_700Bold', // Using fallback if not loaded
  },
  description: {
    fontSize: 16,
    color: COLORS.textGrey,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
