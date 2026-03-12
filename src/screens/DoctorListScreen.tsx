import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import { useRouter } from 'expo-router';

const FILTERS = ['General Physician', 'Pediatrician', 'Cardiologist', 'Dermatologist'];

const DOCTORS = [
  { id: '1', name: 'Dr. Anita Joshi', spec: 'General Physician', exp: '12 yrs', rating: 4.8, online: true, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150' },
  { id: '2', name: 'Dr. Rajesh Kumar', spec: 'Pediatrician', exp: '15 yrs', rating: 4.9, online: true, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150' },
  { id: '3', name: 'Dr. Smita Patil', spec: 'Dermatologist', exp: '8 yrs', rating: 4.7, online: false, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150' },
  { id: '4', name: 'Dr. Vikram Singh', spec: 'Cardiologist', exp: '20 yrs', rating: 5.0, online: true, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150' },
];

const DoctorCard = ({ item, onPress }: { item: any; onPress: () => void }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.cardContainer} onPress={onPress}>
    <GlassCard style={styles.doctorCard}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <View style={[styles.statusDot, { backgroundColor: item.online ? '#4caf50' : '#aaa' }]} />
          </View>
          <Text style={styles.specialization}>{item.spec}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Feather name="briefcase" size={12} color="#666" />
              <Text style={styles.statText}>{item.exp}</Text>
            </View>
            <View style={[styles.stat, { marginLeft: 12 }]}>
              <Feather name="star" size={12} color="#FFB000" />
              <Text style={styles.statText}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={onPress}>
        <Text style={styles.bookButtonText}>Book Consultation</Text>
      </TouchableOpacity>
    </GlassCard>
  </TouchableOpacity>
);

const DoctorListScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('General Physician');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consult Doctor</Text>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search doctors, specialties..." 
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => setActiveFilter(item)}
              style={[
                styles.filterChip, 
                activeFilter === item && styles.activeFilterChip
              ]}
            >
              <Text style={[
                styles.filterText,
                activeFilter === item && styles.activeFilterText
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={DOCTORS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard 
            item={item} 
            onPress={() => router.push('/teleconsultation-request')} 
          />
        )}
        contentContainerStyle={styles.doctorList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.secondaryBg,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Theme.spacing.l,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: Theme.spacing.l,
    elevation: 4,
  },
  title: {
    ...Theme.typography.heading,
    marginBottom: Theme.spacing.m,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.secondaryBg,
    borderRadius: 16,
    paddingHorizontal: Theme.spacing.m,
    height: 50,
  },
  searchIcon: {
    marginRight: Theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    ...Theme.typography.body,
    fontSize: 14,
  },
  filtersContainer: {
    marginTop: Theme.spacing.m,
  },
  filtersList: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.s,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    elevation: 2,
  },
  activeFilterChip: {
    backgroundColor: Theme.colors.primaryAccent,
  },
  filterText: {
    ...Theme.typography.bodySmall,
    fontWeight: '600',
  },
  activeFilterText: {
    color: Theme.colors.textDark,
  },
  doctorList: {
    padding: Theme.spacing.l,
    paddingBottom: 100,
  },
  cardContainer: {
    marginBottom: Theme.spacing.m,
  },
  doctorCard: {
    padding: Theme.spacing.m,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.m,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: Theme.spacing.m,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorName: {
    ...Theme.typography.subheading,
    fontSize: 18,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  specialization: {
    ...Theme.typography.bodySmall,
    opacity: 0.6,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
  bookButton: {
    backgroundColor: Theme.colors.primaryAccent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    ...Theme.typography.button,
    fontSize: 12,
    color: Theme.colors.textDark,
  },
});

export default DoctorListScreen;
