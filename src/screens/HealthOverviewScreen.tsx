import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Theme } from '../theme';
import AnatomyVisualizer from '../components/AnatomyVisualizer';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PATIENT_DATA = {
  name: 'Muminul Hoque',
  height: '162',
  weight: '64',
  oxygen: '96',
  heartRate: '76',
  kidney: '98',
  bp: '116/74',
  cholesterol: '168',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200'
};

const HealthOverviewScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Overview</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnatomyVisualizer data={PATIENT_DATA} />
        
        <View style={styles.footer}>
           <View style={styles.statsCard}>
             <View style={styles.statItem}>
               <Text style={styles.statValue}>{PATIENT_DATA.height}<Text style={styles.statUnit}> cm</Text></Text>
               <Text style={styles.statLabel}>Height</Text>
             </View>
             
             <View style={styles.profileContainer}>
                <Image 
                  source={{ uri: PATIENT_DATA.avatar }} 
                  style={styles.avatar} 
                />
                <Text style={styles.profileName}>{PATIENT_DATA.name}</Text>
             </View>

             <View style={styles.statItem}>
               <Text style={styles.statValue}>{PATIENT_DATA.weight}<Text style={styles.statUnit}> kg</Text></Text>
               <Text style={styles.statLabel}>Weight</Text>
             </View>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FF', // Light lavender background as per image
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#030315',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: -100, // Pull up to overlap with anatomy
    zIndex: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#030315',
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontWeight: '600',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#F7F8FF',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#030315',
    marginTop: 10,
  },
});

export default HealthOverviewScreen;
