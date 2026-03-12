import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';

const LoginScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleContinue = () => {
    // Basic validation placeholder
    router.replace('/(main)');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=2070' }} 
        style={styles.background}
        imageStyle={{ opacity: 0.15 }}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.logoIcon}>
                <Feather name="plus-square" size={32} color={Theme.colors.primaryAccent} />
              </View>
              <Text style={styles.welcomeText}>
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </Text>
              <Text style={styles.subText}>
                {isRegistering ? 'Join our community for better healthcare' : 'Sign in to access your health services'}
              </Text>
            </View>

            <GlassCard style={styles.card}>
              <Input 
                label="Username" 
                placeholder="Enter your username" 
                value={username} 
                onChangeText={setUsername}
              />

              <Input 
                label="Password" 
                placeholder="Enter your password" 
                value={password} 
                onChangeText={setPassword}
                secureTextEntry
              />

              {isRegistering && (
                <Input 
                  label="Confirm Password" 
                  placeholder="Repeat your password" 
                  value={confirmPassword} 
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              )}

              <PrimaryButton 
                title={isRegistering ? "Register" : "Continue"} 
                onPress={handleContinue}
                style={styles.button}
              />

              <TouchableOpacity 
                onPress={() => setIsRegistering(!isRegistering)}
                style={styles.link}
              >
                <Text style={styles.linkText}>
                  {isRegistering ? "Already have an account? Login" : "Register New Account"}
                </Text>
              </TouchableOpacity>
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryBg,
  },
  background: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Theme.spacing.l,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: Theme.colors.textDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.m,
  },
  welcomeText: {
    ...Theme.typography.heading,
    textAlign: 'center',
  },
  subText: {
    ...Theme.typography.bodySmall,
    textAlign: 'center',
    opacity: 0.6,
    marginTop: Theme.spacing.xs,
  },
  card: {
    width: '100%',
  },
  button: {
    marginTop: Theme.spacing.m,
  },
  link: {
    marginTop: Theme.spacing.l,
    alignItems: 'center',
  },
  linkText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.textDark,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
