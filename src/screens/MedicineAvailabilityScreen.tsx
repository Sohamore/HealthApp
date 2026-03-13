import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import MapComponent from '../components/MapComponent';

const PHARMACIES = [
  { 
    id: '1', 
    name: 'Village Health Pharmacy', 
    distance: '1.2 km', 
    available: true, 
    address: 'Near Bus Stand, Village Road',
    latitude: 22.7196,
    longitude: 75.8577 
  },
  { 
    id: '2', 
    name: 'City Medicos', 
    distance: '5.5 km', 
    available: true, 
    address: 'Main Market, District Center',
    latitude: 22.7250,
    longitude: 75.8650
  },
  { 
    id: '3', 
    name: 'Rural Care Point', 
    distance: '0.8 km', 
    available: false, 
    address: 'Opposite Government School',
    latitude: 22.7150,
    longitude: 75.8520
  },
];

const MedicineAvailabilityScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medicine Availability</Text>
        <GlassCard style={styles.searchCard}>
          <View style={styles.searchRow}>
            <Feather name="search" size={20} color="#666" />
            <TextInput
              placeholder="Enter medicine name (e.g. Paracetamol)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.input}
            />
          </View>
        </GlassCard>
      </View>

      <View style={styles.content}>
        <GlassCard style={styles.mapPreview}>
          <MapComponent 
            pharmacies={PHARMACIES}
            initialRegion={{
              latitude: 22.7196,
              longitude: 75.8577,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          />
        </GlassCard>

        <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
        <FlatList
          data={PHARMACIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GlassCard style={styles.pharmacyCard}>
              <View style={styles.pharmacyInfo}>
                <View style={styles.pharmacyHeader}>
                  <Text style={styles.pharmacyName}>{item.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: item.available ? '#e8f5e9' : '#ffebee' }]}>
                    <Text style={[styles.statusText, { color: item.available ? '#2e7d32' : '#c62828' }]}>
                      {item.available ? 'Available' : 'Out of Stock'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.pharmacyAddress}>{item.address}</Text>
                <View style={styles.distanceRow}>
                   <Feather name="map-pin" size={14} color="#666" />
                   <Text style={styles.distanceText}>{item.distance} away</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.directionButton}>
                 <Feather name="navigation" size={20} color={Theme.colors.textDark} />
              </TouchableOpacity>
            </GlassCard>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  searchCard: {
    padding: Theme.spacing.s,
    backgroundColor: Theme.colors.secondaryBg,
    borderRadius: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.s,
  },
  input: {
    flex: 1,
    marginLeft: Theme.spacing.s,
    ...Theme.typography.body,
    fontSize: 14,
    height: 40,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.l,
  },
  mapPreview: {
    height: 150,
    marginBottom: Theme.spacing.l,
    padding: 0,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...Theme.typography.subheading,
    fontSize: 18,
    marginBottom: Theme.spacing.m,
  },
  listContent: {
    paddingBottom: 100,
  },
  pharmacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  pharmacyName: {
    ...Theme.typography.body,
    fontWeight: '700',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  pharmacyAddress: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
  },
  directionButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Theme.colors.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Theme.spacing.m,
    elevation: 2,
  },
});

export default MedicineAvailabilityScreen;
