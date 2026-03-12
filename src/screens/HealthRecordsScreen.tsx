import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const RECORDS = [
  { id: '1', date: 'Oct 12, 2025', doctor: 'Dr. Anita Joshi', illness: 'Viral Fever', diagnosis: 'Mild Viral Fever', prescription: 'Paracetamol, Vitamin C' },
  { id: '2', date: 'Aug 24, 2025', doctor: 'Dr. Rajesh Kumar', illness: 'Checkup', diagnosis: 'Routine Pediatric Checkup', prescription: 'N/A' },
];

const ProgressTracker = () => (
  <View style={styles.progressSection}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressTitle}>Meeting Progress</Text>
      <Text style={styles.progressValue}>60%</Text>
    </View>
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: '60%' }]} />
    </View>
    <Text style={styles.progressSubtext}>1 Meeting Link Remaining</Text>
  </View>
);

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
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [records, setRecords] = React.useState(RECORDS);
  
  // Form State
  const [newDoctor, setNewDoctor] = React.useState('');
  const [newIllness, setNewIllness] = React.useState('');
  const [newDate, setNewDate] = React.useState('');
  const [newTime, setNewTime] = React.useState('');

  const handleAddRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: newDate || 'Today',
      doctor: newDoctor,
      illness: newIllness,
      diagnosis: newIllness,
      prescription: 'Prescribed by ' + newDoctor
    };
    setRecords([newRecord, ...records]);
    setShowAddModal(false);
    setNewDoctor('');
    setNewIllness('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Health Records</Text>
          <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
            <Text style={styles.toggleText}>{isAdmin ? 'Switch to Patient View' : 'Switch to Admin View'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
           <Feather name="plus" size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={<ProgressTracker />}
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <RecordCard item={item} index={index} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Record</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Doctor Name</Text>
              <TextInput style={styles.formInput} placeholder="e.g. Dr. Rajesh" value={newDoctor} onChangeText={setNewDoctor} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Illness / Reason</Text>
              <TextInput style={styles.formInput} placeholder="e.g. Fever" value={newIllness} onChangeText={setNewIllness} />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.formLabel}>Date</Text>
                <TextInput style={styles.formInput} placeholder="Oct 15" value={newDate} onChangeText={setNewDate} />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.formLabel}>Time</Text>
                <TextInput style={styles.formInput} placeholder="10:00 AM" value={newTime} onChangeText={setNewTime} />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddRecord}>
                <Text style={styles.saveText}>Save Record</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>
      </Modal>
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
  toggleText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primaryAccent,
    fontWeight: '700',
    marginTop: 4,
  },
  progressSection: {
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.s,
  },
  progressTitle: {
    ...Theme.typography.subheading,
    fontSize: 16,
  },
  progressValue: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: Theme.colors.primaryAccent,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Theme.spacing.s,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Theme.colors.primaryAccent,
  },
  progressSubtext: {
    ...Theme.typography.bodySmall,
    fontSize: 11,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: Theme.spacing.l,
  },
  modalContent: {
    padding: Theme.spacing.l,
  },
  modalTitle: {
    ...Theme.typography.heading,
    fontSize: 20,
    marginBottom: Theme.spacing.l,
  },
  formGroup: {
    marginBottom: Theme.spacing.m,
  },
  formLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    marginBottom: 6,
    color: '#666',
  },
  formInput: {
    backgroundColor: Theme.colors.secondaryBg,
    borderRadius: 12,
    padding: 12,
    ...Theme.typography.body,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Theme.spacing.l,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 10,
  },
  cancelText: {
    ...Theme.typography.body,
    color: '#999',
  },
  saveButton: {
    backgroundColor: Theme.colors.primaryAccent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  saveText: {
    ...Theme.typography.button,
    color: Theme.colors.textDark,
  },
});

export default HealthRecordsScreen;
