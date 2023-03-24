import { ENDPOINT } from "./contants";
import { ChatCompletion } from "./types";

export const createChatCompletion = async (
  content: string
): Promise<ChatCompletion> => {
  console.log("content", content);

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

export const getTokens = async (): Promise<string> => {
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

export const updateTokens = async (tokensUsed: number): Promise<string> => {
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
