import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from "expo-blur";
import React from "react";
import { Theme } from "../theme";

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 40,
}) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView
        intensity={intensity}
        style={StyleSheet.absoluteFill}
        tint="light"
      />
      <View style={styles.borderOver}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.l,
    overflow: "hidden",
    backgroundColor: Theme.colors.glassBackground,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  borderOver: {
    padding: Theme.spacing.l,
    borderRadius: Theme.borderRadius.l,
  },
});

export default GlassCard;
