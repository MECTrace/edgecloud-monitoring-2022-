export interface IPolicyUpdate {
  policyName?: string;
  description?: string;
  cpuOverPercent?: number;
  cpuLessThanPercent?: number;
  numberResendNode?: number;
  activated?: boolean;
}

export interface IPolicy extends IPolicyUpdate {
  id: string;
  nodeList: INodeByPolicy[];
}

export interface INodeByPolicy {
  nodeId: string;
  nodeName: string;
  policyId: string;
  policyName: string;
  activated: boolean;
}
