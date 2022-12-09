import { ENodeStatus, IStatusConfig } from '@/interfaces/interfaceHierarchyTree';

export const rootCoordinate = { x: 0, y: 0 };

export const defaultNodeWidth = 90;
export const defaultNodeHeight = 50;

export const NodeStatusConfig: IStatusConfig[] = [
  {
    key: 'NONE',
    status: ENodeStatus.NONE,
    label: 'dashboard.status.none',
    color: 'grey',
  },
  {
    key: 'TLS',
    status: ENodeStatus.TLS,
    label: 'dashboard.status.tls',
    color: 'green',
  },
  {
    key: 'IMPOSSIBLE',
    status: ENodeStatus.IMPOSSIBLE,
    label: 'dashboard.status.impossible',
    color: 'yellow',
  },
];
