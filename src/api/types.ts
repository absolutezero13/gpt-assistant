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

export interface Message {
  role: "user" | "assistant";
  content: string;
  promptId: number;
}

export interface TokenResponse {
  tokensUsed: number;
  key: string;
  tokenLimit: number;
}
export interface CustomUser {
  email: string;
  displayName: string;
  photoURL: string;
  messageHistory: Message[];
  uid: string;
  role: "user" | "assistant" | "admin";
  apiKey?: string;
  settings?: {
    model: string;
    craziness: number;
  };
}
