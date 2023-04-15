import { create } from "zustand";
import { Prompt, initialPrompts } from "../data/prompts";

const usePromptStore = create<PromptStore>((set) => ({
  prompts: initialPrompts,
  setPrompts: (prompts: Prompt[]) => set({ prompts }),
}));

interface PromptStore {
  prompts: Prompt[];
  setPrompts: (prompts: Prompt[]) => void;
}

export default usePromptStore;
