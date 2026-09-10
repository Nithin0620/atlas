import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVoiceStore } from '../../stores/useVoiceStore';
import { PhoneOff, Mic, MicOff } from 'lucide-react-native';

export default function CallScreen() {
  const { mentorId } = useLocalSearchParams<{ mentorId: string }>();
  const router = useRouter();
  const { status, isMuted, setStatus, setMuted, resetCall } = useVoiceStore();

  useEffect(() => {
    setStatus('connected');
    return () => {
      resetCall();
    };
  }, [mentorId]);

  const handleEndCall = () => {
    resetCall();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sessionStatus}>LIVE SESSION</Text>
        <Text style={styles.mentorIdText}>Mentor ID: {mentorId}</Text>
      </View>

      <View style={styles.visualizerContainer}>
        <View style={styles.orb}>
          <Text style={styles.statusIndicator}>{status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isMuted && styles.controlButtonMuted]}
          onPress={() => setMuted(!isMuted)}
        >
          {isMuted ? <MicOff color="#FFFFFF" size={24} /> : <Mic color="#FFFFFF" size={24} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <PhoneOff color="#FFFFFF" size={28} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: { alignItems: 'center', marginTop: 20 },
  sessionStatus: { color: '#38BDF8', fontSize: 13, fontWeight: '700', letterSpacing: 1.5 },
  mentorIdText: { color: '#94A3B8', fontSize: 14, marginTop: 4 },
  visualizerContainer: { alignItems: 'center', justifyContent: 'center' },
  orb: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#0369A1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
  },
  statusIndicator: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonMuted: { backgroundColor: '#E11D48' },
  endCallButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
