import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchMentors } from '../../lib/api';
import { IMentor } from '@atlas/types';

export default function MentorsScreen() {
  const router = useRouter();
  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchMentors();
        setMentors(data);
      } catch (e: any) {
        console.error(e);
        // Fallback or handle offline
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#38BDF8" style={styles.loader} />
      ) : (
        <FlatList
          data={mentors}
          keyExtractor={(item) => item._id || item.name}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No mentors available yet.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mentorCard}
              onPress={() => router.push(`/call/${item._id || 'default'}`)}
            >
              <Text style={styles.mentorName}>{item.name}</Text>
              <Text style={styles.mentorSubject}>{item.subject} • {item.topic}</Text>
              <Text style={styles.callPrompt}>Tap to call 🎙️</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  loader: { marginTop: 40 },
  list: { padding: 16 },
  mentorCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  mentorName: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  mentorSubject: { fontSize: 14, color: '#94A3B8', marginBottom: 10 },
  callPrompt: { fontSize: 13, color: '#38BDF8', fontWeight: '500' },
  emptyContainer: { padding: 30, alignItems: 'center' },
  emptyText: { color: '#64748B', fontSize: 15 },
});
