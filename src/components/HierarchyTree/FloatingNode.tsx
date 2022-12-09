import { Handle, NodeProps, Position } from 'react-flow-renderer';
import './HierarchyTree.scss';
const FloatingNode = (nodeProps: NodeProps) => {
  return (
    <div id="floatingNode" className="d-flex flex-column text-center align-items-center">
      <div className={`status-${nodeProps.data.status} status`}></div>
      <div>
        <span className="label">{nodeProps.data.label}</span>
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />

        <Handle
          className="absolute-center visibility-hidden"
          type="source"
          position={Position.Right}
          id={`hs-${nodeProps.id}`}
        />

        <Handle
          className="absolute-center visibility-hidden"
          type="target"
          position={Position.Right}
          id={`ht-${nodeProps.id}`}
        />
      </div>
    </div>
  );
};

export default FloatingNode;
