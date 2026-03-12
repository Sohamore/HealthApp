import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
const { width } = Dimensions.get('window');
import { DOCTORS_DATA } from "../data/doctors";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import GlassCard from "../components/GlassCard";
import { Theme } from "../theme";

// Mock LinearGradient if expo-linear-gradient is not available (though it should be)
import { LinearGradient } from "expo-linear-gradient";

const CATEGORIES = [
  {
    id: "1",
    title: "Consult Doctor Remotely",
    // desc: "Talk to doctors",
    icon: "activity",
    color: "#e1f5fe",
  },
  {
    id: "2",
    title: "Check Symptoms",
    // desc: "Understand your health",
    icon: "search",
    color: "#f3e5f5",
  },
  {
    id: "3",
    title: "Medicine Availability",
    // desc: "Find medicines nearby",
    icon: "shopping-bag",
    color: "#e8f5e9",
  },
  {
    id: "4",
    title: "My Health Records",
    // desc: "View your history",
    icon: "file-text",
    color: "#fff3e0",
  },
  {
    id: "5",
    title: "Emergency Help",
    // desc: "Immediate assistance",
    icon: "alert-circle",
    color: "#ffebee",
  },
];

const DashboardCard = ({ item }: { item: any }) => {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    switch (item.id) {
      case "1":
        router.push("/(main)/doctors");
        break;
      case "2":
        router.push("/(main)/symptoms");
        break;
      case "3":
        router.push("/medicine");
        break;
      case "4":
        router.push("/(main)/records");
        break;
      case "5":
        router.push("/emergency");
        break;
      default:
        break;
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

const SPECIALISTS = ["All", "GP", "Cardiologists", "Neurologists", "Pediatricians"];

const DoctorCard = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <GlassCard style={styles.doctorCard}>
      <View style={styles.doctorInfoContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.doctorListImage} />
          <View style={styles.ratingBadge}>
            <Feather name="star" size={10} color="#FFB000" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorNameText}>{item.name}</Text>
          <Text style={styles.doctorSpecText}>{item.spec}</Text>
          <View style={styles.availabilityRow}>
            <Feather name="clock" size={12} color={Theme.colors.primaryAccent} />
            <Text style={styles.availabilityText}>8:00 am - 5:00 pm</Text>
          </View>
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => router.push({ pathname: '/teleconsultation-request', params: { id: item.id } })}
          >
            <Text style={styles.bookButtonText}>Book now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GlassCard>
  );
};

const HomeScreen = () => {
  const router = useRouter();
  const [selectedSpecialist, setSelectedSpecialist] = React.useState("All");

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste,</Text>
            <Text style={styles.userName}>Soham 👋</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.push("/(main)/notifications")}
            >
              <Feather name="bell" size={24} color={Theme.colors.textDark} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={() => router.push("/(main)/profile")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.banner}>
          <LinearGradient
            colors={[Theme.colors.primaryAccent, "#fff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Free Rural Checkup</Text>
              <Text style={styles.bannerSubtitle}>
                Available in your village this Sunday
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            <Feather
              name="shield"
              size={80}
              color="rgba(255,255,255,0.3)"
              style={styles.bannerIcon}
            />
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Our Services</Text>

        <View style={styles.grid}>
          {CATEGORIES.map((item) => (
            <DashboardCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our specialists</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Explore all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.specialistsScroll}
        >
          {SPECIALISTS.map(spec => (
            <TouchableOpacity 
              key={spec} 
              onPress={() => setSelectedSpecialist(spec)}
              style={[
                styles.specChip,
                selectedSpecialist === spec && styles.activeSpecChip
              ]}
            >
              <Text style={[
                styles.specChipText,
                selectedSpecialist === spec && styles.activeSpecChipText
              ]}>{spec}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.doctorCarouselScroll}
        >
          {DOCTORS_DATA.map(doc => (
            <DoctorCard key={doc.id} item={doc} />
          ))}
        </ScrollView>

        <View style={styles.footerSpace} />
      </ScrollView>

      {/* Floating Chatbot FAB */}
      <TouchableOpacity 
        style={styles.chatFab}
        onPress={() => router.push("/(main)/chatbot")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[Theme.colors.primaryAccent, "#A8E063"]}
          style={styles.fabGradient}
        >
          <MaterialIcons name="insights" size={28} color={Theme.colors.textDark} />
        </LinearGradient>
      </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "#fff",
  },
  banner: {
    marginHorizontal: Theme.spacing.l,
    borderRadius: Theme.borderRadius.l,
    overflow: "hidden",
    height: 160,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
  },
  bannerGradient: {
    flex: 1,
    padding: Theme.spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bannerContent: {
    flex: 1,
    justifyContent: "center",
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
    alignSelf: "flex-start",
    marginTop: 12,
  },
  bannerButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  bannerIcon: {
    position: "absolute",
    right: -10,
    bottom: -10,
  },
  sectionTitle: {
    ...Theme.typography.subheading,
    marginHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Theme.spacing.m,
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: Theme.spacing.m,
  },
  cardTouch: {
    flex: 1,
  },
  card: {
    padding: Theme.spacing.m,
    height: 160,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.s,
  },
  cardTitle: {
    ...Theme.typography.body,
    fontWeight: "700",
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Theme.spacing.l,
  },
  seeAll: {
    ...Theme.typography.bodySmall,
    color: '#666',
    fontWeight: '600',
  },
  specialistsScroll: {
    paddingLeft: Theme.spacing.l,
    paddingVertical: Theme.spacing.m,
  },
  specChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 10,
  },
  activeSpecChip: {
    backgroundColor: Theme.colors.primaryAccent,
    borderColor: Theme.colors.primaryAccent,
  },
  specChipText: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: '#666',
  },
  activeSpecChipText: {
    color: Theme.colors.textDark,
  },
  doctorCarouselScroll: {
    paddingLeft: Theme.spacing.l,
    paddingRight: Theme.spacing.l,
    paddingVertical: Theme.spacing.s,
  },
  doctorCard: {
    width: width * 0.8,
    marginRight: Theme.spacing.m,
    padding: Theme.spacing.m,
    borderRadius: 24,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: Theme.spacing.m,
  },
  doctorListImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#333',
    marginLeft: 2,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorNameText: {
    ...Theme.typography.subheading,
    fontSize: 18,
    marginBottom: 2,
  },
  doctorSpecText: {
    ...Theme.typography.bodySmall,
    color: '#888',
    marginBottom: 6,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: Theme.colors.textDark,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  chatFab: {
    position: 'absolute',
    bottom: 90, // Lowered slightly
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: Theme.colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
