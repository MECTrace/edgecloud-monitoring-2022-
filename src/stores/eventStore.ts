import { StateCreator } from 'zustand';
import { IEventStore } from '@/interfaces/interfaceCommon';

export const createEventSlice: StateCreator<IEventStore> = (set) => ({
  communicationEvent: [],
  setCommunicationEvent: (communicationEvent) => set(() => ({ communicationEvent })),
});
