import { createStore } from "./store";

export const renderTimeStore = createStore<{
  rows: number;
  duration: number;
} | null>(null);
