import { getEventById, getNumberOfFile } from '@/services/DashboardAPI';
import useGlobalStore from '@/stores';
import { createNodesAndEdges, updateNodes } from '@/utils/hierarchyTree';
import { Box, Group, Modal } from '@mantine/core';
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
import { ResOverviewEvent, ISocketEvent } from '@/interfaces/interfaceListEvent';
const onInit = (reactFlowInstance: ReactFlowInstance) => reactFlowInstance.fitView();

const HierarchyTreeCanvas = () => {
  const { nodeData, communicationEvent } = useGlobalStore((state) => ({
    nodeData: state.nodeData,
    communicationEvent: state.communicationEvent,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>();

  useEffect(() => {
    communicationEvent.map((item: ISocketEvent) => {
      getNumberOfFile(item.sendNodeId, item.receiveNodeId).subscribe({
        next: ({ data }) => {
          item.label = data.total;
        },
      });
    });
  }, [communicationEvent]);
  console.log(communicationEvent);
  const { nodes: newNodes, edges: newEdges } = createNodesAndEdges(nodeData, communicationEvent);

  useEffect(() => {
    const nodesUpdated = updateNodes(nodes, communicationEvent);
    setNodes(nodesUpdated);
    setEdges(newEdges);
  }, [nodeData, communicationEvent]);

  useEffect(() => {
    setNodes(newNodes);
    setEdges(newEdges);
  }, []);

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
            console.log(data.events);
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
    <>
      <Modal size="xl" withCloseButton={false} centered opened={isShowModal} onClose={onCloseModal}>
        <NodeDetail node={selectedNode} />
      </Modal>
      <ReactFlow
        className="diagram-fill floatingEdges"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        panOnDrag={false}
      >
        <Controls showInteractive={false} />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default HierarchyTreeCanvas;
