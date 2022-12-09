import { APIs } from '@/config/httpConfig/apis';
import { http } from '@/helper/http';
import { IListEventResData, ResOverviewEvent } from '@/interfaces/interfaceListEvent';
import { AxiosRequestConfig } from 'axios';
import { from } from 'rxjs';

export const getListEvent = (payload: any, config: AxiosRequestConfig) =>
  from(http.post<IListEventResData>(APIs.GET_LIST_EVENT, payload, config));

export const getListEventPaging = (payload: any, config?: AxiosRequestConfig) =>
  from(http.post<IListEventResData>(APIs.GET_LIST_EVENT_PAGING, payload, config));

export const getOverviewEvent = () => from(http.get<ResOverviewEvent>(APIs.GET_OVERVIEW_EVENT));
