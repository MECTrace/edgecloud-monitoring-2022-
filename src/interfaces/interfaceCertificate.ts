export interface ResCert {
  expiredCertificates: number;
  certificates: ICertificateRes[];
  issuedCertificates: number;
  serverStatus: IServerStatus;
}

export interface IServerStatus {
  errorServer: number;
  notWorkServer: number;
  normalServer: number;
}
export interface ICertificate {
  id: string;
  nodeId: string;
  expiredDay: string;
  issuedDate: string;
  createdAt: string;
  updatedAt: string;
  certificateIssue: string;
}
export interface ICertificateRes {
  id: string;
  nodeId: string;
  name: string;
  expiredDay: string;
  issuedDate: string;
  createdAt: string;
  updatedAt: string;
  certificateIssue: string;
  status: string;
}

export interface ICertNumberDetail {
  issuedCert: number;
  expiredCert: number;
  revokeCert: number;
}
