import { APIs } from '@/config/httpConfig/apis';
import { http } from '@/helper/http';
import { IDiagramDevice } from '@/interfaces/interfaceHierarchyTree';
import { IListEventPage } from '@/interfaces/interfaceListEvent';
import { from } from 'rxjs';

const setUriEvent = (id: string, page?: number) =>
  APIs.GET_EVENT_BY_ID + id + '?page=' + (page || 1);

export const getNodeList = () => from(http.get<IDiagramDevice[]>(APIs.GET_NODE_LIST));
export const getEventById = (id: string, page?: number) =>
  from(http.get<IListEventPage>(setUriEvent(id, page)));
