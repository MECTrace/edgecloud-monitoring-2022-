import { IListEventForm } from '@/interfaces/interfaceListEvent';
import { paginationConfig } from './system';

export const filterFormInitVal: IListEventForm = {
  keyword: '',
  dateRange: [null, null],
  categoryID: ['1', '2', '3'],
  currentPage: 1,
  size: paginationConfig.pageSizePool[0],
};

export const categoryConfig = [
  {
    id: 1,
    label: 'list_event.category.availability_status_transfer',
  },
  {
    id: 2,
    label: 'list_event.category.virus',
  },
  {
    id: 3,
    label: 'list_event.category.communication',
  },
];
