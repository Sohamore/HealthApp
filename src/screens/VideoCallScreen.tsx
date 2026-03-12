import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../theme';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { DOCTORS_DATA } from '../data/doctors';

const { width, height } = Dimensions.get('window');

const VideoCallScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const doctor = DOCTORS_DATA.find(d => d.id === id) || DOCTORS_DATA[0];

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const ringScale = useSharedValue(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    ringScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Remote Video (Doctor) */}
      <Image 
        source={{ uri: doctor.image }} 
        style={styles.remoteVideo} 
        blurRadius={isVideoOff ? 10 : 0}
      />
      
      {/* Overlay Gradient/Darkness */}
      <View style={styles.overlay} />

      {/* Header Info */}
      <View style={styles.header}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <View style={styles.statusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.statusText}>Live Consultation • {formatTime(callDuration)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.minimizeButton} onPress={() => router.back()}>
          <Feather name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Local Video Preview (Patient) */}
      <View style={styles.localPreviewContainer}>
        {isVideoOff ? (
          <View style={styles.videoOffPlaceholder}>
            <Feather name="video-off" size={24} color="#fff" />
          </View>
        ) : (
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200' }} 
            style={styles.localVideo} 
          />
        )}
      </View>

      {/* Signal Strength Badge */}
      <View style={styles.signalBadge}>
        <MaterialCommunityIcons name="signal-cellular-3" size={14} color="#4CAF50" />
        <Text style={styles.signalText}>HD Quality</Text>
      </View>

      {/* Interaction Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlButton, isMuted && styles.activeControl]} 
          onPress={() => setIsMuted(!isMuted)}
        >
          <Feather name={isMuted ? "mic-off" : "mic"} size={24} color={isMuted ? "#fff" : "#fff"} />
          <Text style={styles.controlLabel}>{isMuted ? "Unmute" : "Mute"}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.endCallButton} 
          onPress={handleEndCall}
        >
          <MaterialCommunityIcons name="phone-hangup" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, isVideoOff && styles.activeControl]} 
          onPress={() => setIsVideoOff(!isVideoOff)}
        >
          <Feather name={isVideoOff ? "video-off" : "video"} size={24} color={isVideoOff ? "#fff" : "#fff"} />
          <Text style={styles.controlLabel}>{isVideoOff ? "Start" : "Stop"}</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Actions */}
      <View style={styles.extraActions}>
        <TouchableOpacity style={styles.actionCircle}>
          <Feather name="message-square" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCircle}>
          <Feather name="share-2" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCircle}>
          <Feather name="more-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  remoteVideo: {
    width: width,
    height: height,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...Theme.typography.heading,
    color: '#fff',
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    ...Theme.typography.bodySmall,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  minimizeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  localPreviewContainer: {
    position: 'absolute',
    top: 140,
    right: 24,
    width: 120,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#333',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    elevation: 10,
  },
  localVideo: {
    width: '100%',
    height: '100%',
  },
  videoOffPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  signalBadge: {
    position: 'absolute',
    top: 154,
    right: 36,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 11,
  },
  signalText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    paddingHorizontal: 30,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 15,
  },
  activeControl: {
    backgroundColor: '#FF4D4D',
  },
  controlLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    position: 'absolute',
    bottom: -20,
  },
  endCallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  extraActions: {
    position: 'absolute',
    right: 24,
    bottom: 180,
    alignItems: 'center',
  },
  actionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

export default VideoCallScreen;
