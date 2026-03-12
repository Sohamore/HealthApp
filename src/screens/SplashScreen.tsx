import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withSequence, 
  withTiming,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    // Pulse animation for logo
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1,
      true
    );

    // Fade in text
    opacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    translateY.value = withDelay(500, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));

    // Navigate to Onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <LinearGradient
      colors={[Theme.colors.primaryBg, Theme.colors.primaryAccent]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.glow, logoStyle]} />
        <Animated.View style={[styles.logo, logoStyle]}>
          <Feather name="heart" size={60} color={Theme.colors.primaryAccent} />
        </Animated.View>
      </View>

      <Animated.View style={[styles.content, textStyle]}>
        <Text style={styles.title}>RuralCare</Text>
        <Text style={styles.tagline}>Smart Healthcare for Rural Communities</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Theme.colors.textDark,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowColor:Theme.colors.primaryAccent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Theme.colors.primaryAccent,
    opacity: 0.3,
    filter: 'blur(20px)',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...Theme.typography.heading,
    fontSize: 40,
    color: Theme.colors.textDark,
    marginBottom: Theme.spacing.xs,
  },
  tagline: {
    ...Theme.typography.body,
    color: Theme.colors.textDark,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.xl,
  },
});

export default SplashScreen;
