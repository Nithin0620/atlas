import { ApiResponse, IMentor, ISession } from '@atlas/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchMentors(subject?: string): Promise<IMentor[]> {
  try {
    const url = subject && subject !== 'all'
      ? `${API_BASE_URL}/api/mentors?subject=${encodeURIComponent(subject)}`
      : `${API_BASE_URL}/api/mentors`;

    const res = await fetch(url);
    const data: ApiResponse<IMentor[]> = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch mentors');
    }
    return data.data || [];
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return [];
  }
}

export async function recordSession(sessionData: Partial<ISession>): Promise<ISession | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    });
    const data: ApiResponse<ISession> = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to record session');
    }
    return data.data!;
  } catch (error) {
    console.error('Error recording session:', error);
    return null;
  }
}
