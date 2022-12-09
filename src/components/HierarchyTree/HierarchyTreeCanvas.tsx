import { getEventById } from '@/services/DashboardAPI';
import useGlobalStore from '@/stores';
import { createNodesAndEdges } from '@/utils/hierarchyTree';
import { Box, Modal } from '@mantine/core';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  EdgeTypes,
  Node,
  NodeTypes,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import FloatingConnectionLine from './FloatingConnectionLine';
import FloatingEdge from './FloatingEdge';
import FloatingNode from './FloatingNode';
import './HierarchyTree.scss';
import NodeDetail from './NodeDetail';
const onInit = (reactFlowInstance: ReactFlowInstance) => reactFlowInstance.fitView();

const HierarchyTreeCanvas = ({ hideAttribution }: { hideAttribution: boolean }) => {
  const { nodeData, communicationEvent } = useGlobalStore((state) => ({
    nodeData: state.nodeData,
    communicationEvent: state.communicationEvent,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>();

  useEffect(() => {
    const { nodes, edges } = createNodesAndEdges(nodeData, communicationEvent);
    setEdges(edges);
    setNodes(nodes);
  }, [nodeData, communicationEvent]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const edgeTypes: EdgeTypes = {
    floating: FloatingEdge,
  };

  const nodeTypes: NodeTypes = useMemo(() => ({ customNode: FloatingNode }), []);

  const onNodeClick = (_: MouseEvent, node: Node) => {
    const { id } = node;
    node &&
      getEventById(id).subscribe({
        next: ({ data }) => {
          if (data.events.length) {
            setSelectedNode(data.events);
            setIsShowModal(true);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <Box className="floatingEdges h100">
      <Modal size="xl" withCloseButton={false} centered opened={isShowModal} onClose={onCloseModal}>
        <NodeDetail node={selectedNode} />
      </Modal>
      <ReactFlow
        className={hideAttribution ? 'react-flow__white-censor' : ''}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        nodesDraggable={false}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        panOnDrag={false}
      >
        <Controls showInteractive={false} />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </Box>
  );
};

export default HierarchyTreeCanvas;
