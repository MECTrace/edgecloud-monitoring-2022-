import { IPaginationData } from './interfaceCommon';

export interface IListEventForm extends IPaginationData {
  keyword: string;
  lastRecordCreatedTime?: string;
  dateRange: [Date | null, Date | null];
  categoryID: string[];
}

export interface IListEventResData extends IPaginationData {
  listEvent: IListEvent[];
}

export interface IFile {
  id: string;
  fileName: string;
  fileType: string;
  path: string;
}

export interface ISocketEvent {
  id: string;
  sendNodeId: string;
  receiveNodeId: string;
  status: number;
  label: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface IListEvent {
  id: string;
  sendNode: string;
  receiveNode: string;
  file?: IFile;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IListEventRes {
  createdAt: string;
  updatedAt?: string;
  id: string;
  fileType: string;
  receiveNodeId: string;
  receiveNode: string;
  sendNodeId: string;
  sendNode: string;
  status: string;
  policyName: string;
}
export interface IListEventPage {
  events: IListEventRes[];
  totalPage: number;
  currentPage: number;
  hasNextPage: boolean;
}

export interface ResOverviewEvent {
  total: number;
  numberOfFailed: number;
  numberOfSucceed: number;
}
