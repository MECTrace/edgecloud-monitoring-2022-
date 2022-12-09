import { StateCreator } from 'zustand';
import { socket } from '@/config/httpConfig/socket';
import { ISystemStore } from '@/interfaces/interfaceCommon';

export const createSystemSlice: StateCreator<ISystemStore> = (set) => ({
  socket,
  isAFK: false,
  setIsAFK: (value) => set(() => ({ isAFK: value })),
});
