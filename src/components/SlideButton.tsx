import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH - 48;
const BUTTON_HEIGHT = 60;
const THUMB_SIZE = 48;
const MAX_TRANSLATE_X = BUTTON_WIDTH - THUMB_SIZE - 12;

interface SlideButtonProps {
  onComplete: () => void;
  title: string;
}

const SlideButton: React.FC<SlideButtonProps> = ({ onComplete, title }) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      const newX = event.translationX;
      if (newX >= 0 && newX <= MAX_TRANSLATE_X) {
        translateX.value = newX;
      }
    })
    .onEnd(() => {
      if (translateX.value > MAX_TRANSLATE_X * 0.8) {
        translateX.value = withSpring(MAX_TRANSLATE_X);
        runOnJS(onComplete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, MAX_TRANSLATE_X * 0.5],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, textStyle]}>{title}</Animated.Text>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.thumb, thumbStyle]}>
          <Feather name="arrow-right" size={24} color="#0B0F2F" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#0B0F2F',
    borderRadius: BUTTON_HEIGHT / 2,
    justifyContent: 'center',
    padding: 6,
    position: 'relative',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: '#8ED081',
    borderRadius: THUMB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
});

export default SlideButton;
