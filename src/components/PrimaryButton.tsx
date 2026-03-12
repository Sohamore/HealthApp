import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Theme } from '../theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style, textStyle }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, animatedStyle, style]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primaryAccent,
    borderRadius: Theme.borderRadius.m,
    paddingVertical: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    ...Theme.typography.button,
    color: Theme.colors.textDark,
  },
});

export default PrimaryButton;
