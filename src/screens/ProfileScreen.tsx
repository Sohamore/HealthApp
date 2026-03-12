import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200' }} 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.editBadge}>
             <Feather name="camera" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Soham Kumar</Text>
        <Text style={styles.village}>Pipariya Village, MP</Text>
      </View>

      <GlassCard style={styles.infoCard}>
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="phone" size={18} color="#666" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>Phone Number</Text>
               <Text style={styles.infoValue}>+91 98765 43210</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="calendar" size={18} color="#666" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>Age / Gender</Text>
               <Text style={styles.infoValue}>28 Years / Male</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="droplet" size={18} color="#ff4d4d" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>Blood Group</Text>
               <Text style={styles.infoValue}>O+ Positive</Text>
            </View>
         </View>
      </GlassCard>

      <Text style={styles.sectionTitle}>App Settings</Text>
      <GlassCard style={styles.settingsCard}>
         <TouchableOpacity style={styles.settingItem}>
            <Feather name="globe" size={20} color={Theme.colors.textDark} />
            <Text style={styles.settingText}>Language - Hindi</Text>
            <Feather name="chevron-right" size={20} color="#ccc" />
         </TouchableOpacity>
         <View style={styles.divider} />
         <TouchableOpacity style={styles.settingItem}>
            <Feather name="bell" size={20} color={Theme.colors.textDark} />
            <Text style={styles.settingText}>Notifications</Text>
            <Feather name="chevron-right" size={20} color="#ccc" />
         </TouchableOpacity>
         <View style={styles.divider} />
         <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <Feather name="log-out" size={20} color="#ff4d4d" />
            <Text style={[styles.settingText, { color: '#ff4d4d' }]}>Logout</Text>
         </TouchableOpacity>
      </GlassCard>

      <View style={styles.footerSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.secondaryBg,
  },
  scrollContent: {
    padding: Theme.spacing.l,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.m,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Theme.colors.textDark,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    ...Theme.typography.subheading,
    fontSize: 22,
  },
  village: {
    ...Theme.typography.bodySmall,
    opacity: 0.6,
  },
  infoCard: {
    padding: 0,
    marginBottom: Theme.spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.secondaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    marginLeft: Theme.spacing.m,
  },
  infoLabel: {
    ...Theme.typography.bodySmall,
    fontSize: 10,
    color: '#888',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  infoValue: {
    ...Theme.typography.body,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: Theme.spacing.m,
  },
  sectionTitle: {
    ...Theme.typography.subheading,
    marginBottom: Theme.spacing.m,
  },
  settingsCard: {
    padding: 0,
    marginBottom: Theme.spacing.xl,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
  },
  settingText: {
    flex: 1,
    ...Theme.typography.body,
    marginLeft: Theme.spacing.m,
    fontWeight: '600',
  },
  footerSpace: {
    height: 100,
  },
});

export default ProfileScreen;
