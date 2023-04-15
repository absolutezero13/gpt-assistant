import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Prompt, initialPrompts } from "../data/prompts";
// TODO : TYPE THIS (I'm not sure how to type this)
const usePromptStore = create(
  persist(
    (set) => ({
      prompts: initialPrompts,
      setPrompts: (prompts: Prompt[]) => set({ prompts }),
    }),
    {
      name: "prompts",
    }
  )
);

interface PromptStore {
  prompts: Prompt[];
  setPrompts: (prompts: Prompt[]) => void;
}

export default usePromptStore;
