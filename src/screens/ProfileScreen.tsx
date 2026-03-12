import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  
  // Profile State
  const [name, setName] = React.useState('Soham Kumar');
  const [address, setAddress] = React.useState('Pipariya Village, MP');
  const [phoneNumber, setPhoneNumber] = React.useState('+91 98765 43210');
  const [age, setAge] = React.useState('28');
  const [gender, setGender] = React.useState('Male');
  const [bloodGroup, setBloodGroup] = React.useState('O+');
  const [pinCode, setPinCode] = React.useState('461775');

  const handleLogout = () => {
    router.replace('/login');
  };

  const handleSave = () => {
    setIsEditing(false);
    // Persist changes logic here
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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.village}>{address}</Text>
        
        <TouchableOpacity 
          style={[styles.editModeButton, isEditing && styles.saveButton]} 
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Feather name={isEditing ? "check" : "edit-2"} size={16} color="#fff" />
          <Text style={styles.editModeButtonText}>{isEditing ? "Save Changes" : "Edit Profile"}</Text>
        </TouchableOpacity>
      </View>

      <GlassCard style={styles.infoCard}>
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="phone" size={18} color="#666" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>Phone Number</Text>
               <Text style={styles.infoValue}>{phoneNumber}</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="calendar" size={18} color="#666" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>Age / Gender</Text>
               <Text style={styles.infoValue}>{age} Years / {gender}</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="map-pin" size={18} color="#666" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>PIN Code</Text>
               <Text style={styles.infoValue}>{pinCode}</Text>
            </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
               <Feather name="droplet" size={18} color="#ff4d4d" />
            </View>
            <View style={styles.infoText}>
               <Text style={styles.infoLabel}>Blood Group</Text>
               <Text style={styles.infoValue}>{bloodGroup} Positive</Text>
            </View>
         </View>
      </GlassCard>

      {isEditing && (
        <View style={styles.editForm}>
          <Text style={styles.formTitle}>Edit Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputBox}><Feather name="user" size={16} color="#aaa" /><TextInput style={styles.textInput} value={name} onChangeText={setName} /></View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputBox}><Feather name="phone" size={16} color="#aaa" /><TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" /></View>
          </View>
          <View style={styles.rowInputs}>
             <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Age</Text>
                <View style={styles.inputBox}><TextInput style={styles.textInput} value={age} onChangeText={setAge} keyboardType="numeric" /></View>
             </View>
             <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>PIN Code</Text>
                <View style={styles.inputBox}><TextInput style={styles.textInput} value={pinCode} onChangeText={setPinCode} keyboardType="numeric" /></View>
             </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address / Village</Text>
            <View style={styles.inputBox}><Feather name="map" size={16} color="#aaa" /><TextInput style={styles.textInput} value={address} onChangeText={setAddress} multiline /></View>
          </View>

          <TouchableOpacity 
            style={styles.formSaveButton} 
            onPress={handleSave}
          >
            <Text style={styles.formSaveButtonText}>Save Profile Information</Text>
          </TouchableOpacity>
        </View>
      )}

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
    marginBottom: Theme.spacing.m,
  },
  editModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.textDark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  editModeButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },
  editForm: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: Theme.spacing.l,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  formTitle: {
    ...Theme.typography.subheading,
    marginBottom: 20,
    color: Theme.colors.primaryAccent,
  },
  inputGroup: {
    marginBottom: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  formSaveButton: {
    backgroundColor: Theme.colors.primaryAccent,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor:Theme.colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  formSaveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
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
