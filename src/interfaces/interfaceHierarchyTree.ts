export type NodeData = {
  label: JSX.Element | string;
  sourceHandlerIDs?: string[];
  targetHandlerIDs?: string[];
};

export enum ENodeStatus {
  NONE = 0,
  TLS = 1,
  IMPOSSIBLE = 2,
}

export interface IStatusConfig {
  key: keyof typeof ENodeStatus;
  className?: string;
  status: ENodeStatus;
  icon?: string;
  label: string;
  color?: string;
}

export interface IDiagramDevice {
  id: string;
  name: string;
  typeNode: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  issueDate?: string;
  certificationIssue?: string;
}

export interface IListDevice {
  listDevice: IDiagramDevice[];
}
