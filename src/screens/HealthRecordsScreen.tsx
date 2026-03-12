import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const RECORDS = [
  { id: '1', date: 'Oct 12, 2025', doctor: 'Dr. Anita Joshi', diagnosis: 'Mild Viral Fever', prescription: 'Paracetamol, Vitamin C' },
  { id: '2', date: 'Aug 24, 2025', doctor: 'Dr. Rajesh Kumar', diagnosis: 'Routine Pediatric Checkup', prescription: 'N/A' },
  { id: '3', date: 'June 15, 2025', doctor: 'Dr. Smita Patil', diagnosis: 'Skin Allergy', prescription: 'Antihistamines, Calamine Lotion' },
  { id: '4', date: 'Feb 10, 2025', doctor: 'City General Hospital', diagnosis: 'General Health Exam', prescription: 'Multivitamins' },
];

const RecordCard = ({ item, index }: { item: any, index: number }) => {
  const router = useRouter();
  const isFirst = index === 0;
  const isLast = index === RECORDS.length - 1;

  const handlePress = () => {
    router.push('/health-overview');
  };

  return (
    <View style={styles.recordRow}>
      <View style={styles.timelineContainer}>
        <View style={[styles.timelineLine, isFirst && { height: '50%', top: '50%' }, isLast && { height: '50%' }]} />
        <View style={styles.timelineDot}>
           <View style={styles.innerDot} />
        </View>
      </View>
      
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={handlePress}
        style={styles.cardContainer}
      >
        <Animated.View 
          entering={FadeInDown.delay(index * 100)}
          style={{ flex: 1 }}
        >
          <GlassCard style={styles.recordCard}>
             <View style={styles.recordHeader}>
                <Text style={styles.recordDate}>{item.date}</Text>
                <Feather name="chevron-right" size={18} color="#aaa" />
             </View>
             <Text style={styles.doctorName}>{item.doctor}</Text>
             <View style={styles.diagnosisBox}>
                <Text style={styles.label}>Diagnosis:</Text>
                <Text style={styles.value}>{item.diagnosis}</Text>
             </View>
             <View style={styles.prescriptionBox}>
                <Feather name="file-text" size={14} color={Theme.colors.primaryAccent} />
                <Text style={styles.prescriptionText}>{item.prescription}</Text>
             </View>
          </GlassCard>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const HealthRecordsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Health Records</Text>
        <TouchableOpacity style={styles.addButton}>
           <Feather name="plus" size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={RECORDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <RecordCard item={item} index={index} />}
        contentContainerStyle={styles.listContent}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    ...Theme.typography.heading,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: 120,
  },
  recordRow: {
    flexDirection: 'row',
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    backgroundColor: '#ddd',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Theme.colors.primaryAccent,
    marginTop: 24,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.primaryAccent,
  },
  cardContainer: {
    flex: 1,
    marginLeft: Theme.spacing.s,
    marginBottom: Theme.spacing.m,
  },
  recordCard: {
    padding: Theme.spacing.m,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recordDate: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: '#888',
  },
  doctorName: {
    ...Theme.typography.subheading,
    fontSize: 16,
    marginBottom: Theme.spacing.s,
  },
  diagnosisBox: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 8,
    borderRadius: 8,
    marginBottom: Theme.spacing.s,
  },
  label: {
    ...Theme.typography.bodySmall,
    fontSize: 10,
    color: '#666',
    fontWeight: '700',
  },
  value: {
    ...Theme.typography.bodySmall,
    fontSize: 13,
    color: Theme.colors.textDark,
  },
  prescriptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prescriptionText: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    marginLeft: 6,
    color: '#555',
  },
});

export default HealthRecordsScreen;
