import { create } from 'zustand'

import type { GetMediaDetailInput } from '../types/media-api'

type CreateMediaLogModalStore = {
  selection: GetMediaDetailInput | null
  openCreate: (selection: GetMediaDetailInput) => void
  closeCreate: () => void
}

export const useCreateMediaLogModalStore =
  create<CreateMediaLogModalStore>()((set) => ({
    selection: null,

    openCreate: (selection) => set({ selection }),

    closeCreate: () => set({ selection: null }),
  }))
