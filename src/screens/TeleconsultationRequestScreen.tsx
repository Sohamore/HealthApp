import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';

const REASONS = ['General Fever', 'Cough & Cold', 'Skin Issue', 'Stomach Pain', 'Other'];
const TIME_SLOTS = ['Morning (9 AM - 12 PM)', 'Afternoon (1 PM - 4 PM)', 'Evening (5 PM - 8 PM)'];

const TeleconsultationRequestScreen = () => {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState('General Fever');
  const [symptoms, setSymptoms] = useState('');
  const [selectedTime, setSelectedTime] = useState('Morning (9 AM - 12 PM)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <View style={styles.successContainer}>
        <Animated.View entering={FadeInUp} style={styles.successCard}>
          <View style={styles.successIconBox}>
            <Feather name="check" size={40} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Request Sent!</Text>
          <Text style={styles.successSubtitle}>Dr. Anita Joshi will review your request and contact you soon.</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Request</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Doctor Summary */}
        <Animated.View entering={FadeInRight} style={styles.doctorSummary}>
          <GlassCard style={styles.summaryCard}>
            <View style={styles.doctorIcon}>
              <Feather name="user" size={24} color={Theme.colors.primaryAccent} />
            </View>
            <View>
              <Text style={styles.doctorName}>Dr. Anita Joshi</Text>
              <Text style={styles.doctorSpec}>General Physician</Text>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Reason for Consultation */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reason for Consultation</Text>
          <View style={styles.chipsContainer}>
            {REASONS.map((reason) => (
              <TouchableOpacity
                key={reason}
                onPress={() => setSelectedReason(reason)}
                style={[
                  styles.chip,
                  selectedReason === reason && styles.activeChip
                ]}
              >
                <Text style={[styles.chipText, selectedReason === reason && styles.activeChipText]}>{reason}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Symptoms Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Describe your Symptoms</Text>
          <GlassCard style={styles.inputCard}>
            <View style={styles.inputWithMic}>
              <TextInput multiline numberOfLines={4} placeholder="e.g. Feeling feverish since last night with a slight headache..." style={styles.textInput} value={symptoms} onChangeText={setSymptoms} placeholderTextColor="#aaa" />
              <TouchableOpacity style={styles.micButton} onPress={() => setIsRecording(!isRecording)}>
                {isRecording && <Animated.View entering={FadeInUp} exiting={FadeOut} style={styles.pulseDisk} />}
                <Feather name="mic" size={18} color={isRecording ? Theme.colors.primaryAccent : "#666"} />
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>

        {/* Preferred Time */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preferred Time Slot</Text>
          {TIME_SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot}
              onPress={() => setSelectedTime(slot)}
              style={[
                styles.slotCard,
                selectedTime === slot && styles.activeSlotCard
              ]}
            >
              <Feather 
                name={selectedTime === slot ? "check-circle" : "circle"} 
                size={20} 
                color={selectedTime === slot ? Theme.colors.primaryAccent : "#ccc"} 
              />
              <Text style={[styles.slotText, selectedTime === slot && styles.activeSlotText]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <PrimaryButton 
          title="Send Teleconsultation Request" 
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.secondaryBg,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Theme.colors.secondaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...Theme.typography.subheading,
    fontSize: 18,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  doctorSummary: {
    marginBottom: 24,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  doctorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(191, 230, 153, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  doctorName: {
    ...Theme.typography.subheading,
    fontSize: 16,
  },
  doctorSpec: {
    ...Theme.typography.bodySmall,
    opacity: 0.6,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    ...Theme.typography.body,
    fontWeight: '700',
    marginBottom: 12,
    color: '#444',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    margin: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeChip: {
    backgroundColor: Theme.colors.primaryAccent,
    borderColor: Theme.colors.primaryAccent,
  },
  chipText: {
    ...Theme.typography.bodySmall,
    fontWeight: '600',
    color: '#666',
  },
  activeChipText: {
    color: Theme.colors.textDark,
  },
  inputCard: {
    padding: 12,
    minHeight: 120,
  },
  inputWithMic: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textInput: {
    ...Theme.typography.body,
    fontSize: 14,
    textAlignVertical: 'top',
    flex: 1,
  },
  micButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pulseDisk: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(191, 230, 153, 0.4)',
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeSlotCard: {
    borderColor: Theme.colors.primaryAccent,
    backgroundColor: 'rgba(191, 230, 153, 0.05)',
  },
  slotText: {
    ...Theme.typography.body,
    marginLeft: 12,
    color: '#555',
  },
  activeSlotText: {
    fontWeight: '700',
    color: Theme.colors.textDark,
  },
  submitButton: {
    marginTop: 10,
  },
  successContainer: {
    flex: 1,
    backgroundColor: Theme.colors.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    elevation: 20,
  },
  successIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    ...Theme.typography.heading,
    marginBottom: 12,
  },
  successSubtitle: {
    ...Theme.typography.body,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default TeleconsultationRequestScreen;
