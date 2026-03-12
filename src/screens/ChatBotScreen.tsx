import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatBotScreen = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! I am your Dihati Health Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string) => {
    const lowInput = input.toLowerCase();
    if (lowInput.includes('fever') || lowInput.includes('bukhar')) {
      return "I see you're mentioning fever. Would you like to use our Symptom Checker or connect with Dr. Anita Joshi (General Physician)?";
    }
    if (lowInput.includes('appointment') || lowInput.includes('booking')) {
      return "You can book an appointment by going to the 'Consult Doctor' section on the Home screen or selecting a doctor from the carousel.";
    }
    if (lowInput.includes('hello') || lowInput.includes('hi')) {
      return "Hello! I can help you find doctors, check symptoms, or manage your health records. What's on your mind?";
    }
    return "I'm still learning, but I can help you navigate RuralCare. You can ask about doctors, symptoms, or how to see your records!";
  };

  useEffect(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <View style={styles.aiIcon}>
            <MaterialIcons name="insights" size={20} color={Theme.colors.primaryAccent} />
          </View>
          <View>
            <Text style={styles.headerTitle}>RuralCare AI</Text>
            <Text style={styles.headerStatus}>Online • Health Assistant</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <Animated.View 
            key={msg.id} 
            entering={msg.sender === 'ai' ? FadeInUp : FadeInDown}
            layout={Layout.springify()}
            style={[
              styles.messageWrapper,
              msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper
            ]}
          >
            {msg.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Feather name="cpu" size={14} color="#fff" />
              </View>
            )}
            <View style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}>
              <Text style={[
                styles.messageText,
                msg.sender === 'user' ? styles.userText : styles.aiText
              ]}>
                {msg.text}
              </Text>
              <Text style={styles.timestamp}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <GlassCard style={styles.inputCard}>
          <TextInput
            placeholder="Ask anything about your health..."
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            multiline
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.disabledSend]} 
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Feather name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </GlassCard>
      </View>
    </KeyboardAvoidingView>
  );
};

import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.secondaryBg,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Theme.colors.secondaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(191, 230, 153, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitle: {
    ...Theme.typography.subheading,
    fontSize: 16,
  },
  headerStatus: {
    ...Theme.typography.bodySmall,
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '700',
  },
  chatContent: {
    padding: 20,
    paddingBottom: 40,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '85%',
  },
  userWrapper: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiWrapper: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.colors.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 8,
  },
  messageBubble: {
    padding: 14,
    borderRadius: 20,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: Theme.colors.textDark,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...Theme.typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: Theme.colors.textDark,
  },
  timestamp: {
    fontSize: 9,
    opacity: 0.5,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 100 : 85, // Adjusted to sit perfectly above tab bar
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  input: {
    flex: 1,
    ...Theme.typography.body,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primaryAccent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledSend: {
    backgroundColor: '#ccc',
  },
});

export default ChatBotScreen;
