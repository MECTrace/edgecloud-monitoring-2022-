import { APIs } from '@/config/httpConfig/apis';
import { http } from '@/helper/http';
import { INodeByPolicy, IPolicy, IPolicyUpdate } from '@/interfaces/interfacePolicy';
import { from } from 'rxjs';

export const getListPolicy = () => from(http.get<IPolicy[]>(APIs.GET_LIST_POLICY));
export const getNodeByPolicy = (policyId: string) =>
  from(http.get<INodeByPolicy[]>(APIs.GET_LIST_NODE_BY_POLICY + policyId));
export const updatePolicyById = (policyId: string, payload: IPolicyUpdate) =>
  from(http.patch<INodeByPolicy[]>(APIs.UPDATE_POLICY + policyId, payload));
export const updatePolicyOfNode = (nodeId: string, payload: { policyId: string }) =>
  from(http.patch<INodeByPolicy[]>(APIs.UPDATE_POLICY_OF_NODE + nodeId, payload));
