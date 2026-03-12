import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  interpolate,
  FadeIn
} from 'react-native-reanimated';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Local asset path
const HUMAN_ANATOMY = require('../../assets/images/human_anatomy.png');

interface HotspotProps {
  x: number;
  y: number;
}

const Hotspot: React.FC<HotspotProps> = ({ x, y }) => {
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.4], [0.8, 0.2]),
  }));

  return (
    <View style={[styles.hotspotContainer, { left: x, top: y }]}>
      <Animated.View style={[styles.pulseCircle, animatedStyle]} />
      <View style={styles.centerDot} />
    </View>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: any;
  iconType?: 'Feather' | 'Material';
  side: 'left' | 'right';
  top: number;
  illustration?: any;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, iconType = 'Feather', side, top, illustration }) => {
  return (
    <Animated.View 
      entering={FadeIn.delay(600)}
      style={[
        styles.metricCard, 
        { top },
        side === 'left' ? { left: 24 } : { right: 24 }
      ]}
    >
      <View style={[styles.metricHeader, side === 'right' && { flexDirection: 'row-reverse' }]}>
        <View style={styles.metricIconBox}>
          {iconType === 'Feather' ? (
            <Feather name={icon} size={18} color="#5D5FEF" />
          ) : (
            <MaterialCommunityIcons name={icon} size={20} color="#5D5FEF" />
          )}
        </View>
        <View style={[styles.metricTitleContainer, side === 'right' && { alignItems: 'flex-end', marginRight: 10 }]}>
          <Text style={styles.metricTitle}>{title}</Text>
          <Text style={styles.metricValue}>{value}{unit ? <Text style={styles.metricUnit}>{` ${unit}`}</Text> : null}</Text>
        </View>
      </View>
      {illustration && (
        <View style={styles.illustrationContainer}>
           <Image source={illustration} style={styles.illustration} resizeMode="contain" />
        </View>
      )}
    </Animated.View>
  );
};

const AnatomyVisualizer = ({ data }: { data?: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.anatomyContainer}>
        <Image 
          source={HUMAN_ANATOMY} 
          style={styles.anatomyImage}
          resizeMode="contain"
        />
        {/* Adjusted Hotspots for the specific blue human model */}
        <Hotspot x={width * 0.48} y={150} /> {/* Chest */}
        <Hotspot x={width * 0.48} y={80} />  {/* Brain */}
        <Hotspot x={width * 0.44} y={280} /> {/* Stomach (Left) */}
        <Hotspot x={width * 0.52} y={280} /> {/* Stomach (Right) */}
        <Hotspot x={width * 0.35} y={220} /> {/* Left Arm */}
        <Hotspot x={width * 0.61} y={220} /> {/* Right Arm */}
      </View>

      <View style={styles.rotationRingContainer}>
        <View style={styles.rotationRing} />
        <View style={styles.ringBadge}>
          <Text style={styles.ringText}>360°</Text>
        </View>
      </View>

      <MetricCard 
        title="Oxygen Level"
        value={data?.oxygen || "96"}
        unit="%"
        icon="wind"
        side="left"
        top={140}
      />
      
      <MetricCard 
        title="Kidney"
        value={data?.kidney || "98"}
        unit="mL/m"
        icon="briefcase"
        side="left"
        top={360}
        illustration={{ uri: 'https://cdn-icons-png.flaticon.com/512/2864/2864324.png' }}
      />

      <MetricCard 
        title="Heart Rate"
        value={data?.heartRate || "76"}
        unit="bpm"
        icon="heart-pulse"
        iconType="Material"
        side="right"
        top={100}
        illustration={{ uri: 'https://cdn-icons-png.flaticon.com/512/2491/2491325.png' }}
      />

      <MetricCard 
        title="Blood Pressure"
        value={data?.bp || "116/74"}
        icon="pulse"
        iconType="Material"
        side="right"
        top={370}
      />

      <MetricCard 
        title="Cholesterol Level"
        value={data?.cholesterol || "168"}
        unit="mg/dL"
        icon="water-outline"
        iconType="Material"
        side="right"
        top={560}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    minHeight: 650,
  },
  anatomyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  anatomyImage: {
    width: width * 0.8,
    height: width * 1.3,
    opacity: 0.95,
  },
  hotspotContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5D5FEF',
  },
  pulseCircle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(93, 100, 255, 0.4)',
  },
  rotationRingContainer: {
    position: 'absolute',
    top: 220,
    width: width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotationRing: {
    width: width * 0.8,
    height: 70,
    borderWidth: 1.5,
    borderColor: 'rgba(93, 95, 239, 0.2)',
    borderRadius: 100,
    transform: [{ scaleX: 1.3 }, { scaleY: 0.3 }, { rotate: '-4deg' }],
  },
  ringBadge: {
    position: 'absolute',
    backgroundColor: '#5D5FEF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    bottom: 25,
  },
  ringText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  metricCard: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    minWidth: 140,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(93, 95, 239, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  metricTitleContainer: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 16,
    color: '#030315',
    fontWeight: '800',
  },
  metricUnit: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  illustrationContainer: {
    marginTop: 10,
    height: 65,
    width: '100%',
    backgroundColor: 'rgba(93, 95, 239, 0.02)',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
});

export default AnatomyVisualizer;
