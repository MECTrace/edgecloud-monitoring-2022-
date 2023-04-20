import { ReactFlowProvider } from 'react-flow-renderer';
import HierarchyTreeCanvas from './HierarchyTreeCanvas';

import './HierarchyTree.scss';

export const HierarchyTree = () => {
  return (
    <ReactFlowProvider>
      <HierarchyTreeCanvas />
    </ReactFlowProvider>
  );
};
