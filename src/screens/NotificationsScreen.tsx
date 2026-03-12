import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const NOTIFICATIONS = [
  { 
    id: '1', 
    type: 'reminder',
    title: 'Upcoming Appointment',
    message: 'Don\'t forget your consultation with Dr. Anita Joshi.',
    time: '10:30 AM',
    date: 'Today',
    doctor: 'Dr. Anita Joshi',
    read: false
  },
  { 
    id: '2', 
    type: 'alert',
    title: 'Urgent Request Accepted',
    message: 'Dr. Vikram Singh has accepted your urgent booking request.',
    time: '09:15 AM',
    date: 'Today',
    doctor: 'Dr. Vikram Singh',
    read: true
  },
  { 
    id: '3', 
    type: 'reminder',
    title: 'Follow-up Scheduled',
    message: 'You have a follow-up meeting scheduled for next Monday.',
    time: '02:00 PM',
    date: 'Oct 15',
    doctor: 'Dr. Rajesh Kumar',
    read: true
  }
];

const NotificationCard = ({ item, index }: { item: any, index: number }) => {
  return (
    <Animated.View entering={FadeInRight.delay(index * 100)}>
      <GlassCard style={[styles.card, !item.read && styles.unreadCard] as any}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: item.type === 'reminder' ? 'rgba(191, 230, 153, 0.2)' : 'rgba(255, 77, 77, 0.1)' }]}>
            <Feather 
              name={item.type === 'reminder' ? 'calendar' : 'zap'} 
              size={18} 
              color={item.type === 'reminder' ? Theme.colors.primaryAccent : '#FF4D4D'} 
            />
          </View>
          <View style={styles.titleInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardTime}>{item.date} • {item.time}</Text>
          </View>
          {!item.read ? <View style={styles.unreadDot} /> : null}
        </View>
        <Text style={styles.cardMessage}>{item.message}</Text>
        <View style={styles.doctorTag}>
          <Feather name="user" size={12} color="#666" />
          <Text style={styles.doctorName}>{item.doctor}</Text>
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const NotificationsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <NotificationCard item={item} index={index} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No new notifications</Text>
          </View>
        }
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Theme.spacing.m,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Theme.typography.subheading,
    fontSize: 20,
  },
  markRead: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primaryAccent,
    fontWeight: '700',
  },
  listContainer: {
    padding: Theme.spacing.l,
    paddingBottom: 100,
  },
  card: {
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  unreadCard: {
    borderColor: 'rgba(191, 230, 153, 0.5)',
    backgroundColor: 'rgba(191, 230, 153, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleInfo: {
    flex: 1,
  },
  cardTitle: {
    ...Theme.typography.body,
    fontWeight: '700',
    fontSize: 15,
  },
  cardTime: {
    ...Theme.typography.bodySmall,
    fontSize: 11,
    opacity: 0.5,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primaryAccent,
  },
  cardMessage: {
    ...Theme.typography.bodySmall,
    color: '#555',
    lineHeight: 18,
    marginBottom: 10,
  },
  doctorTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  doctorName: {
    ...Theme.typography.bodySmall,
    fontSize: 11,
    marginLeft: 4,
    color: '#666',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    ...Theme.typography.body,
    color: '#999',
    marginTop: 16,
  },
});

export default NotificationsScreen;
