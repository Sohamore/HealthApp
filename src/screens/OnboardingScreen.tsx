import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView } from 'react-native';
import { Theme } from '../theme';
import SlideButton from '../components/SlideButton';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeOut,
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  interpolate,
  withSequence
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const COLORS = {
  darkNavy: '#0B0F2F',
  medicalGreen: '#8ED081',
  lightGreenAccent: '#B8E994',
  backgroundGrey: '#F5F5F5',
  white: '#FFFFFF',
  textGrey: '#666',
};

const HEALTH_QUOTES = [
  "Health is the greatest wealth",
  "A healthy outside starts from the inside",
  "The first wealth is health",
  "Pulse of life, care for all",
  "Your health, our priority"
];

// Floating Quote Component - High Fidelity Typography & Motion
const FloatingQuote = () => {
  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const floatAnim = useSharedValue(0);
  
  React.useEffect(() => {
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000 }),
        withTiming(0, { duration: 4000 })
      ),
      -1,
      true
    );

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % HEALTH_QUOTES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const quoteStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 1], [-10, 10]) },
      { rotate: `${interpolate(floatAnim.value, [0, 1], [-1, 1])}deg` }
    ],
  }));

  const icon1Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 1], [0, -40]) },
      { translateX: interpolate(floatAnim.value, [0, 1], [0, 20]) },
    ],
    opacity: interpolate(floatAnim.value, [0.5, 1], [0.8, 0.4]),
  }));

  const icon2Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 1], [0, 30]) },
      { translateX: interpolate(floatAnim.value, [0, 1], [0, -15]) },
    ],
    opacity: interpolate(floatAnim.value, [0, 0.5], [0.3, 0.7]),
  }));

  return (
    <View style={styles.quoteHeroContainer}>
      <Animated.View style={[styles.floatingIcon, { top: -40, right: -20 }, icon1Style]}>
        <Feather name="heart" size={24} color={COLORS.medicalGreen} />
      </Animated.View>
      <Animated.View style={[styles.floatingIcon, { bottom: -20, left: -30 }, icon2Style]}>
        <Feather name="activity" size={20} color={COLORS.medicalGreen} />
      </Animated.View>
      
      <Animated.View style={[styles.quoteCard, quoteStyle]}>
        <Feather name="message-circle" size={24} color={COLORS.lightGreenAccent} style={styles.quoteIcon} />
        <Animated.View 
          key={quoteIndex} 
          entering={FadeInUp.duration(1000)}
          exiting={FadeOut.duration(800)}
        >
          <Text style={styles.actualQuote}>“{HEALTH_QUOTES[quoteIndex]}”</Text>
        </Animated.View>
        <View style={styles.quoteLine} />
      </Animated.View>
    </View>
  );
};

const BackgroundDecorations = () => {
  const blob1 = useSharedValue(0);
  const blob2 = useSharedValue(0);

  React.useEffect(() => {
    blob1.value = withRepeat(withTiming(1, { duration: 8000 }), -1, true);
    blob2.value = withRepeat(withTiming(1, { duration: 10000 }), -1, true);
  }, []);

  const b1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(blob1.value, [0, 1], [-20, 20]) },
      { translateY: interpolate(blob1.value, [0, 1], [0, 30]) },
    ],
  }));

  const b2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(blob2.value, [0, 1], [30, -10]) },
      { translateY: interpolate(blob2.value, [0, 1], [-20, 10]) },
    ],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.blob, { backgroundColor: '#E1FADD', top: '10%', left: '-10%', width: 250, height: 250 }, b1Style]} />
      <Animated.View style={[styles.blob, { backgroundColor: '#F0E6FF', bottom: '20%', right: '-10%', width: 200, height: 200 }, b2Style]} />
      <View style={[styles.bgShape, styles.diamond, { top: height * 0.15, right: width * 0.15, width: 14, height: 14, transform: [{ rotate: '45deg' }] }]} />
      <Feather name="plus" size={24} color={COLORS.medicalGreen} style={[styles.bgShape, { top: 60, left: 40, opacity: 0.3 }]} />
    </View>
  );
};

const OnboardingScreen = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundDecorations />
      
      <View style={styles.topSection}>
        <Animated.View entering={FadeInUp.delay(200)}>
          <FloatingQuote />
        </Animated.View>
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
  quoteHeroContainer: {
    width: width * 0.8,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(142, 208, 129, 0.2)',
    alignItems: 'center',
    shadowColor: COLORS.medicalGreen,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  actualQuote: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.darkNavy,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 34,
  },
  quoteIcon: {
    marginBottom: 10,
    opacity: 0.5,
  },
  quoteLine: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.medicalGreen,
    marginTop: 20,
    borderRadius: 2,
  },
  floatingIcon: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  blob: {
    position: 'absolute',
    borderRadius: 150,
    opacity: 0.4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 32,
    paddingBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
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
