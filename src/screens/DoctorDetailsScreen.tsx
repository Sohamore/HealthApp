import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';

const { width } = Dimensions.get('window');
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import { DOCTORS_DATA } from '../data/doctors';

const DoctorDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showUrgentSuccess, setShowUrgentSuccess] = useState(false);

  // Find the specific doctor
  const doctor = DOCTORS_DATA.find(d => d.id === id) || DOCTORS_DATA[0];

  const handleBack = () => router.back();

  const handleUrgentAppoint = () => {
    setShowUrgentSuccess(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image 
            source={{ uri: doctor.image }} 
            style={styles.doctorImage} 
          />
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
             <Feather name="arrow-left" size={24} color={Theme.colors.textDark} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
             <View style={{ flex: 1 }}>
                <Text style={styles.name}>{doctor.name}</Text>
                <Text style={styles.spec}>{doctor.spec} • {doctor.exp} exp.</Text>
             </View>
             
             <TouchableOpacity style={styles.urgentButton} onPress={handleUrgentAppoint} activeOpacity={0.7}>
                <View style={styles.urgentIconBox}><Feather name="zap" size={14} color="#fff" /></View>
                <Text style={styles.urgentText}>Urgent</Text>
             </TouchableOpacity>
          </View>
          
          <View style={styles.ratingRow}>
             <Feather name="star" size={16} color="#FFB000" />
             <Text style={styles.ratingText}>{doctor.rating} ({doctor.reviews} reviews)</Text>
          </View>

          <View style={styles.statsGrid}>
             <GlassCard style={styles.statCard}>
                <Text style={styles.statLabel}>Fee</Text>
                <Text style={styles.statValue}>{doctor.fee}</Text>
             </GlassCard>
             <GlassCard style={styles.statCard}>
                <Text style={styles.statLabel}>Patients</Text>
                <Text style={styles.statValue}>{doctor.patients}</Text>
             </GlassCard>
          </View>

          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>{doctor.about}</Text>

          <Text style={styles.sectionTitle}>Availability</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.availabilityScroll}
          >
             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <View key={day} style={styles.availabilityCard}>
                   <View style={styles.dayCircle}><Text style={styles.dayInitial}>{day.substring(0, 1)}</Text></View>
                   <View style={styles.timeInfo}>
                      <Text style={styles.dayLabel}>{day}</Text>
                      <View style={styles.timeRow}><Feather name="clock" size={10} color={Theme.colors.primaryAccent} /><Text style={styles.timeLabel}>09:00 - 05:00 PM</Text></View>
                   </View>
                </View>
             ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Booking Footer */}
      <GlassCard style={styles.footer}>
         <View style={styles.footerContent}>
            <TouchableOpacity 
              style={styles.videoButton}
              onPress={() => router.push({ pathname: '/video-call', params: { id: doctor.id } })}
            >
               <Feather name="video" size={20} color={Theme.colors.textDark} />
            </TouchableOpacity>
            <PrimaryButton 
              title="Book Appointment" 
              onPress={() => router.push('/teleconsultation-request')} 
              style={styles.mainButton}
            />
         </View>
      </GlassCard>

      {/* Urgent Appointment Modal */}
      <Modal
        visible={showUrgentSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUrgentSuccess(false)}
      >
        <View style={styles.modalOverlay}>
           <Animated.View 
             entering={ZoomIn.duration(400)} 
             exiting={FadeOut.duration(200)}
             style={styles.successBox}
           >
              <View style={styles.successIconCircle}>
                 <Feather name="check" size={40} color="#fff" />
              </View>
              <Text style={styles.successMsgTitle}>Request Done!</Text>
              <Text style={styles.successMsgDesc}>Your urgent appointment or call booking done. The doctor will contact you immediately.</Text>
              <TouchableOpacity 
                style={styles.okButton} 
                onPress={() => setShowUrgentSuccess(false)}
              >
                 <Text style={styles.okButtonText}>Awesome</Text>
              </TouchableOpacity>
           </Animated.View>
        </View>
      </Modal>

      <Animated.View entering={FadeIn} style={styles.backgroundGraphic}>
         <Feather name="activity" size={200} color="rgba(191, 230, 153, 0.1)" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 180,
  },
  header: {
    height: 350,
    position: 'relative',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    padding: Theme.spacing.l,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    ...Theme.typography.heading,
    fontSize: 22,
  },
  spec: {
    ...Theme.typography.body,
    opacity: 0.6,
    marginTop: 2,
  },
  urgentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  urgentIconBox: {
    marginRight: 6,
  },
  urgentText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: Theme.spacing.l,
  },
  ratingText: {
    ...Theme.typography.bodySmall,
    marginLeft: 6,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.l,
  },
  statCard: {
    width: '48%',
    padding: Theme.spacing.m,
    alignItems: 'center',
  },
  statLabel: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    opacity: 0.5,
  },
  statValue: {
    ...Theme.typography.subheading,
    color: Theme.colors.primaryAccent,
  },
  sectionTitle: {
    ...Theme.typography.subheading,
    fontSize: 18,
    marginBottom: 8,
    marginTop: Theme.spacing.m,
  },
  aboutText: {
    ...Theme.typography.bodySmall,
    lineHeight: 20,
    opacity: 0.8,
  },
  availabilityScroll: {
    paddingVertical: 10,
    paddingRight: 20,
  },
  availabilityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.45,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(191, 230, 153, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  dayInitial: {
    fontSize: 14,
    fontWeight: '800',
    color: Theme.colors.primaryAccent,
  },
  timeInfo: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: Theme.spacing.m,
    borderRadius: 20,
    elevation: 10,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Theme.colors.secondaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mainButton: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successBox: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    elevation: 20,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successMsgTitle: {
    ...Theme.typography.heading,
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  successMsgDesc: {
    ...Theme.typography.body,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  okButton: {
    backgroundColor: Theme.colors.primaryAccent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  okButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.textDark,
  },
  backgroundGraphic: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    zIndex: -1,
  },
});

export default DoctorDetailsScreen;
