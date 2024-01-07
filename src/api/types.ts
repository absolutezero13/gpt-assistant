export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }
  ];
}

export interface IMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  promptId: number;
}

export interface TokenResponse {
  tokensUsed: number;
  key: string;
  tokenLimit: number;
}

export interface UserSettings {
  model: string;
  craziness: number;
  voiceAnswer: boolean;
  voiceChoice: string;
}
export interface CustomUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  messageHistory: IMessage[];
  uid: string;
  role: "user" | "assistant" | "admin";
  type: "anonymous" | "google";
  apiKey?: string;
  settings?: UserSettings;
}
