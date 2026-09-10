import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Atlas 🪐</Text>
      <Text style={styles.subtitle}>Voice-powered AI learning companion</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Practice</Text>
        <Text style={styles.cardDescription}>
          Start an instant conversational tutoring session with an AI mentor.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/(tabs)/mentors')}
        >
          <Text style={styles.buttonText}>Explore Mentors</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#94A3B8', marginBottom: 24 },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#F8FAFC', marginBottom: 8 },
  cardDescription: { fontSize: 14, color: '#94A3B8', marginBottom: 16, lineHeight: 20 },
  primaryButton: {
    backgroundColor: '#0284C7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
