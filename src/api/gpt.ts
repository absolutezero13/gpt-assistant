import { ENDPOINT } from "./contants";
import { ChatCompletion, TokenResponse } from "./types";

export const createChatCompletion = async (
  content: string
): Promise<ChatCompletion | any> => {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log("error", error);
    return error as any;
  }
};

export const getTokens = async (): Promise<TokenResponse> => {
  try {
    const res = await fetch(`${ENDPOINT}tokens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log("error", error);
    return error as any;
  }
};

export const updateTokens = async (
  tokensUsed: number
): Promise<TokenResponse> => {
  try {
    const res = await fetch(`${ENDPOINT}tokens`, {
      method: "POST",
      body: JSON.stringify({
        tokensUsed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log("error", error);
    return error as any;
  }
};
