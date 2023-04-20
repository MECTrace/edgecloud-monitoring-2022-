import { ENodeStatus, IStatusConfig } from '@/interfaces/interfaceHierarchyTree';

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
