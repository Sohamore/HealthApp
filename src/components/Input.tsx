import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { Theme } from '../theme';

interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  style?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderAnimation = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(isFocused ? Theme.colors.primaryAccent : 'rgba(0,0,0,0.1)'),
      borderWidth: withTiming(isFocused ? 2 : 1),
    };
  });

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.inputContainer, borderAnimation]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.m,
    width: '100%',
  },
  label: {
    ...Theme.typography.bodySmall,
    marginBottom: Theme.spacing.xs,
    color: Theme.colors.textDark,
    opacity: 0.7,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: Theme.borderRadius.m,
    paddingHorizontal: Theme.spacing.m,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    ...Theme.typography.body,
    color: Theme.colors.textDark,
  },
});

export default Input;
