import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

const DoctorDetailsScreen = () => {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400' }} 
            style={styles.doctorImage} 
          />
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
             <Feather name="arrow-left" size={24} color={Theme.colors.textDark} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.name}>Dr. Anita Joshi</Text>
          <Text style={styles.spec}>General Physician • 12 years exp.</Text>
          
          <View style={styles.ratingRow}>
             <Feather name="star" size={16} color="#FFB000" />
             <Text style={styles.ratingText}>4.8 (120+ reviews)</Text>
          </View>

          <View style={styles.statsGrid}>
             <GlassCard style={styles.statCard}>
                <Text style={styles.statLabel}>Fee</Text>
                <Text style={styles.statValue}>₹500</Text>
             </GlassCard>
             <GlassCard style={styles.statCard}>
                <Text style={styles.statLabel}>Patients</Text>
                <Text style={styles.statValue}>1.2k+</Text>
             </GlassCard>
          </View>

          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.aboutText}>
             Dr. Anita Joshi is a highly experienced General Physician based in the district hospital. 
             She specializes in rural healthcare and has been serving the community for over a decade.
          </Text>

          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityGrid}>
             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <View key={day} style={styles.dayBadge}>
                   <Text style={styles.dayText}>{day}</Text>
                   <Text style={styles.timeText}>9-5</Text>
                </View>
             ))}
          </View>
        </View>
      </ScrollView>

      <GlassCard style={styles.footer}>
         <View style={styles.footerContent}>
            <TouchableOpacity style={styles.videoButton}>
               <Feather name="video" size={20} color={Theme.colors.textDark} />
            </TouchableOpacity>
            <PrimaryButton 
              title="Book Appointment" 
              onPress={() => router.push('/teleconsultation-request')} 
              style={styles.mainButton}
            />
         </View>
      </GlassCard>

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
  content: {
    flex: 1,
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
  name: {
    ...Theme.typography.heading,
  },
  spec: {
    ...Theme.typography.body,
    opacity: 0.6,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
  availabilityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayBadge: {
    backgroundColor: Theme.colors.secondaryBg,
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    width: '18%',
  },
  dayText: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    fontSize: 10,
  },
  timeText: {
    fontSize: 10,
    opacity: 0.6,
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
  backgroundGraphic: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    zIndex: -1,
  },
});

export default DoctorDetailsScreen;
