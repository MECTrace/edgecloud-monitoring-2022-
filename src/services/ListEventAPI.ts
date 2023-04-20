import { APIs } from '@/config/httpConfig/apis';
import { http } from '@/helper/http';
import { ResOverviewEvent } from '@/interfaces/interfaceListEvent';
import { from } from 'rxjs';

export const getOverviewEvent = () => from(http.get<ResOverviewEvent>(APIs.GET_OVERVIEW_EVENT));
