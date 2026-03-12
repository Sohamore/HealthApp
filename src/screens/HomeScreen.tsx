import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// Mock LinearGradient if expo-linear-gradient is not available (though it should be)
import { LinearGradient } from 'expo-linear-gradient';

const CATEGORIES = [
  { id: '1', title: 'Consult Doctor', desc: 'Talk to doctors remotely', icon: 'activity', color: '#e1f5fe' },
  { id: '2', title: 'Check Symptoms', desc: 'Understand your health', icon: 'search', color: '#f3e5f5' },
  { id: '3', title: 'Medicine Availability', desc: 'Find medicines nearby', icon: 'shopping-bag', color: '#e8f5e9' },
  { id: '4', title: 'My Health Records', desc: 'View your history', icon: 'file-text', color: '#fff3e0' },
  { id: '5', title: 'Emergency Help', desc: 'Immediate assistance', icon: 'alert-circle', color: '#ffebee' },
];

const DashboardCard = ({ item }) => {
  const router = useRouter();
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => { scale.value = withSpring(0.95); };
  const handlePressOut = () => { scale.value = withSpring(1); };

  const handlePress = () => {
    switch (item.id) {
      case '1': router.push('/(main)/doctors'); break;
      case '2': router.push('/(main)/symptoms'); break;
      case '3': router.push('/medicine'); break;
      case '4': router.push('/(main)/records'); break;
      case '5': router.push('/emergency'); break;
      default: break;
    }
  };

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.cardTouch}
      >
        <GlassCard style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Feather name={item.icon} size={28} color={Theme.colors.textDark} />
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Namaste,</Text>
          <Text style={styles.userName}>Soham 👋</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={24} color={Theme.colors.textDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton}>
             <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100' }}
                style={styles.avatar}
             />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.banner}>
        <LinearGradient
          colors={[Theme.colors.primaryAccent, '#fff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bannerGradient}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Free Rural Checkup</Text>
            <Text style={styles.bannerSubtitle}>Available in your village this Sunday</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <Feather name="shield" size={80} color="rgba(255,255,255,0.3)" style={styles.bannerIcon} />
        </LinearGradient>
      </View>

      <Text style={styles.sectionTitle}>Our Services</Text>
      
      <View style={styles.grid}>
        {CATEGORIES.map(item => (
          <DashboardCard key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.footerSpace} />
    </ScrollView>
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
    marginBottom: Theme.spacing.l,
  },
  greeting: {
    ...Theme.typography.body,
    opacity: 0.6,
  },
  userName: {
    ...Theme.typography.heading,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.s,
    elevation: 2,
  },
  avatarButton: {
    elevation: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#fff',
  },
  banner: {
    marginHorizontal: Theme.spacing.l,
    borderRadius: Theme.borderRadius.l,
    overflow: 'hidden',
    height: 160,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
  },
  bannerGradient: {
    flex: 1,
    padding: Theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    ...Theme.typography.subheading,
    color: Theme.colors.textDark,
  },
  bannerSubtitle: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.textDark,
    opacity: 0.8,
    marginTop: 4,
  },
  bannerButton: {
    backgroundColor: Theme.colors.textDark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  bannerIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionTitle: {
    ...Theme.typography.subheading,
    marginHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.m,
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: Theme.spacing.m,
  },
  cardTouch: {
    flex: 1,
  },
  card: {
    padding: Theme.spacing.m,
    height: 160,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.s,
  },
  cardTitle: {
    ...Theme.typography.body,
    fontWeight: '700',
    fontSize: 15,
  },
  cardDesc: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  footerSpace: {
    height: 100,
  },
});

export default HomeScreen;
