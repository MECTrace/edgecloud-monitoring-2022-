import { APIs } from '@/config/httpConfig/apis';
import { http } from '@/helper/http';
import { ResCert } from '@/interfaces/interfaceCertificate';
import { from } from 'rxjs';

export const getAllCertificate = () => from(http.get<ResCert>(APIs.GET_ALL_CERTIFICATE));
export const deleteCertificate = (nodeId: string) =>
  from(http.delete(APIs.CERTIFICATE + `/${nodeId}`));
export const checkAndUpdateCertificate = (nodeId: string) =>
  from(http.get(APIs.CHECK_CERTIFICATE + `/${nodeId}`));
