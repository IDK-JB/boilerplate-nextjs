'use client';

import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set(produce((s: AppState) => { s.count += 1; })),
      decrement: () => set(produce((s: AppState) => { s.count -= 1; })),
      reset: () => set(produce((s: AppState) => { s.count = 0; })),
    }),
    { name: 'example-store' },
  ),
);
