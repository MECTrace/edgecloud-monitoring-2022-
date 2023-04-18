import { APIs } from '@/config/httpConfig/apis';
import { http } from '@/helper/http';
import { from } from 'rxjs';

export const getNodeUsage = (period: string) => from(http.get<any[]>(APIs.GET_NODE_USAGE + period));
export const getNumberOfFilesTimeSeries = (nodeId: string, numberOfDays: string) =>
  from(http.get<any[]>(APIs.GET_NUMBER_OF_FILE_BY_DAYS + nodeId + '/' + numberOfDays));
export const getNumberOfEachKindOfFile = (nodeId: string) =>
  from(http.get<any[]>(APIs.GET_NUMBER_OF_EACH_KIND_OF_FILE + nodeId));
