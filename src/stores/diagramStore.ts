import { StateCreator } from 'zustand';
import { INodeStore } from '@/interfaces/interfaceCommon';

export const createNodeSlice: StateCreator<INodeStore> = (set) => ({
  nodeData: [],
  setNodeData: (nodeData) => set(() => ({ nodeData })),
});
