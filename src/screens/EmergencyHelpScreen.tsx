import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const EmergencyHelpScreen = () => {
  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
         <Feather name="alert-circle" size={48} color={Theme.colors.emergency} />
         <Text style={styles.title}>Emergency Help</Text>
         <Text style={styles.subtitle}>Fastest way to get medical help when you need it most.</Text>
      </View>

      <Animated.View entering={FadeInUp.delay(200)} style={styles.mainCallContainer}>
        <TouchableOpacity 
          style={styles.emergencyCircle} 
          activeOpacity={0.8}
          onPress={() => handleCall('102')}
        >
          <View style={styles.innerCircle}>
             <Feather name="phone-call" size={40} color="#fff" />
             <Text style={styles.callText}>CALL AMBULANCE</Text>
             <Text style={styles.number}>102</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.optionsGrid}>
        <TouchableOpacity style={styles.optionItem} onPress={() => handleCall('108')}>
           <GlassCard style={styles.optionCard}>
              <Feather name="plus-circle" size={24} color={Theme.colors.emergency} />
              <Text style={styles.optionTitle}>Emergency Response</Text>
              <Text style={styles.optionNumber}>108</Text>
           </GlassCard>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
           <GlassCard style={styles.optionCard}>
              <Feather name="map-pin" size={24} color={Theme.colors.textDark} />
              <Text style={styles.optionTitle}>Nearest Hospital</Text>
              <Text style={styles.optionDesc}>Find nearby care</Text>
           </GlassCard>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <GlassCard style={styles.contactsCard}>
        <View style={styles.contactItem}>
           <View>
              <Text style={styles.contactName}>Village Sarpanch</Text>
              <Text style={styles.contactRelation}>Local Authority</Text>
           </View>
           <TouchableOpacity onPress={() => handleCall('9999999999')}>
              <Feather name="phone" size={20} color={Theme.colors.textDark} />
           </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.contactItem}>
           <View>
              <Text style={styles.contactName}>Ramesh (Son)</Text>
              <Text style={styles.contactRelation}>Family Member</Text>
           </View>
           <TouchableOpacity onPress={() => handleCall('8888888888')}>
              <Feather name="phone" size={20} color={Theme.colors.textDark} />
           </TouchableOpacity>
        </View>
      </GlassCard>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: Theme.spacing.l,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  title: {
    ...Theme.typography.heading,
    color: Theme.colors.emergency,
    marginTop: Theme.spacing.m,
  },
  subtitle: {
    ...Theme.typography.bodySmall,
    textAlign: 'center',
    opacity: 0.6,
    marginTop: Theme.spacing.xs,
  },
  mainCallContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  emergencyCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowColor: Theme.colors.emergency,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Theme.colors.emergency,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callText: {
    ...Theme.typography.button,
    color: '#fff',
    marginTop: Theme.spacing.m,
  },
  number: {
    ...Theme.typography.heading,
    fontSize: 32,
    color: '#fff',
  },
  optionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  optionItem: {
    width: '48%',
  },
  optionCard: {
    padding: Theme.spacing.m,
    alignItems: 'center',
    height: 120,
    justifyContent: 'center',
  },
  optionTitle: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  optionNumber: {
    ...Theme.typography.body,
    fontWeight: '700',
    color: Theme.colors.emergency,
  },
  optionDesc: {
    ...Theme.typography.bodySmall,
    fontSize: 10,
    opacity: 0.6,
  },
  sectionTitle: {
    ...Theme.typography.subheading,
    marginBottom: Theme.spacing.m,
  },
  contactsCard: {
    padding: 0,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.m,
  },
  contactName: {
    ...Theme.typography.body,
    fontWeight: '700',
  },
  contactRelation: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: Theme.spacing.m,
  },
  footerSpace: {
    height: 100,
  },
});

export default EmergencyHelpScreen;
