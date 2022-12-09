import create from 'zustand';
import { IStore } from '@/interfaces/interfaceCommon';
import { createSystemSlice } from './systemStore';
import { createNodeSlice } from './diagramStore';
import { createEventSlice } from './eventStore';

const useGlobalStore = create<IStore>()((...helpers) => ({
  ...createSystemSlice(...helpers),
  ...createNodeSlice(...helpers),
  ...createEventSlice(...helpers),
}));
export default useGlobalStore;
