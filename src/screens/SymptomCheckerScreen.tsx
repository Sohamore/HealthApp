import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import Animated, { FadeInDown, FadeInUp, Layout, FadeOut } from 'react-native-reanimated';

const SYMPTOMS = ['Fever', 'Headache', 'Cough', 'Chest Pain', 'Fatigue', 'Stomach Ache', 'Nausea'];

const SymptomCheckerScreen = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI loading
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        condition: 'Viral Fever',
        advice: 'Drink plenty of fluids, rest well, and take Paracetamol if fever is high.',
        action: 'Consult a general physician if symptoms persist for more than 3 days.'
      });
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Symptom Checker</Text>
        <Text style={styles.subtitle}>Tell us how you're feeling, and our AI will help you understand possible issues.</Text>
      </View>

      <GlassCard style={styles.card}>
        <Text style={styles.question}>What symptoms are you experiencing?</Text>
        <View style={styles.symptomsGrid}>
          {SYMPTOMS.map((symptom) => (
            <TouchableOpacity
              key={symptom}
              onPress={() => toggleSymptom(symptom)}
              style={[
                styles.symptomChip,
                selectedSymptoms.includes(symptom) && styles.selectedChip
              ]}
            >
              <Text style={[
                styles.symptomText,
                selectedSymptoms.includes(symptom) && styles.selectedText
              ]}>{symptom}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput placeholder="Other symptoms (e.g. skin rash, dizziness...)" style={styles.input} placeholderTextColor="#aaa" />
          <TouchableOpacity style={styles.micButton} onPress={() => setIsRecording(!isRecording)}>
            {isRecording ? <Animated.View entering={FadeInDown} exiting={FadeOut} style={styles.pulseDisk} /> : null}
            <Feather name="mic" size={20} color={isRecording ? Theme.colors.primaryAccent : "#666"} />
          </TouchableOpacity>
        </View>

        {isRecording ? (
          <Animated.View entering={FadeInUp} style={styles.voiceIndicator}>
            <Text style={styles.voiceText}>Listening... Say your symptoms clearly.</Text>
          </Animated.View>
        ) : null}

        <PrimaryButton
          title={isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
          onPress={handleAnalyze}
          style={styles.button}
        />
      </GlassCard>

      {isAnalyzing ? (
        <Animated.View entering={FadeInDown} style={styles.loadingContainer}>
           <Feather name="cpu" size={40} color={Theme.colors.primaryAccent} />
           <Text style={styles.loadingText}>Our AI is processing your symptoms...</Text>
        </Animated.View>
      ) : null}

      {(result && !isAnalyzing) ? (
        <Animated.View entering={FadeInUp} layout={Layout.springify()} style={styles.resultContainer}>
          <GlassCard style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Feather name="activity" size={24} color={Theme.colors.primaryAccent} />
              <Text style={styles.resultTitle}>Analysis Result</Text>
            </View>
            
            <View style={styles.resultBody}>
              <Text style={styles.conditionLabel}>Possible Condition:</Text>
              <Text style={styles.conditionText}>{result.condition}</Text>
              
              <Text style={styles.adviceLabel}>Advice:</Text>
              <Text style={styles.adviceText}>{result.advice}</Text>
              
              <Text style={styles.actionLabel}>Suggested Action:</Text>
              <Text style={styles.actionText}>{result.action}</Text>
            </View>
 
            <View style={styles.disclaimerContainer}>
              <Feather name="alert-triangle" size={14} color="#999" />
              <Text style={styles.disclaimerText}>This is not a medical diagnosis. Please consult a doctor for official advice.</Text>
            </View>
          </GlassCard>
        </Animated.View>
      ) : null}

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
    marginBottom: Theme.spacing.xl,
  },
  title: {
    ...Theme.typography.heading,
  },
  subtitle: {
    ...Theme.typography.bodySmall,
    opacity: 0.6,
    marginTop: Theme.spacing.xs,
  },
  card: {
    marginBottom: Theme.spacing.l,
  },
  question: {
    ...Theme.typography.subheading,
    fontSize: 18,
    marginBottom: Theme.spacing.m,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Theme.spacing.m,
  },
  symptomChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Theme.colors.secondaryBg,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  selectedChip: {
    backgroundColor: Theme.colors.primaryAccent,
    borderColor: Theme.colors.primaryAccent,
  },
  symptomText: {
    ...Theme.typography.bodySmall,
    fontWeight: '600',
  },
  selectedText: {
    color: Theme.colors.textDark,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.secondaryBg,
    borderRadius: 12,
    marginBottom: Theme.spacing.m,
  },
  input: {
    flex: 1,
    padding: Theme.spacing.m,
    ...Theme.typography.bodySmall,
  },
  micButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pulseDisk: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(191, 230, 153, 0.4)',
  },
  voiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  voiceText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primaryAccent,
    fontWeight: '700',
    fontSize: 12,
  },
  button: {
    marginTop: Theme.spacing.s,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: Theme.spacing.xl,
  },
  loadingText: {
    ...Theme.typography.bodySmall,
    marginTop: Theme.spacing.m,
    opacity: 0.7,
  },
  resultContainer: {
    marginTop: Theme.spacing.m,
  },
  resultCard: {
    borderColor: Theme.colors.primaryAccent,
    borderWidth: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  resultTitle: {
    ...Theme.typography.subheading,
    marginLeft: Theme.spacing.s,
    fontSize: 18,
  },
  resultBody: {
    marginBottom: Theme.spacing.m,
  },
  conditionLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: '#666',
  },
  conditionText: {
    ...Theme.typography.body,
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.textDark,
    marginBottom: Theme.spacing.s,
  },
  adviceLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: '#666',
    marginTop: 8,
  },
  adviceText: {
    ...Theme.typography.bodySmall,
    lineHeight: 20,
    marginBottom: Theme.spacing.s,
  },
  actionLabel: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: '#666',
    marginTop: 8,
  },
  actionText: {
    ...Theme.typography.bodySmall,
    lineHeight: 20,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 8,
    borderRadius: 8,
    marginTop: Theme.spacing.s,
  },
  disclaimerText: {
    ...Theme.typography.bodySmall,
    fontSize: 10,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  footerSpace: {
    height: 100,
  },
});

export default SymptomCheckerScreen;
