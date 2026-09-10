// Vapi / WebRTC integration helper for React Native
export interface VoiceConfig {
  assistantId?: string;
  apiKey?: string;
}

export class MobileVoiceService {
  private static instance: MobileVoiceService;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): MobileVoiceService {
    if (!MobileVoiceService.instance) {
      MobileVoiceService.instance = new MobileVoiceService();
    }
    return MobileVoiceService.instance;
  }

  public async startCall(mentorId: string, systemPrompt?: string): Promise<boolean> {
    console.log(`Starting voice session with mentor ${mentorId}...`);
    this.isConnected = true;
    return true;
  }

  public async endCall(): Promise<void> {
    console.log('Ending voice session...');
    this.isConnected = false;
  }

  public getCallState(): boolean {
    return this.isConnected;
  }
}

export const mobileVoiceService = MobileVoiceService.getInstance();
