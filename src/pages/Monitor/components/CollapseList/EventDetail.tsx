import { IListEventPage } from '@/interfaces/interfaceListEvent';
import { getEventById } from '@/services/DashboardAPI';
import useGlobalStore from '@/stores';
import { Box, Collapse, Pagination, Text, Table } from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
  nodeId: string;
  expandedRows: any;
};
const initEventDetailState = {
  totalPage: 0,
  hasNextPage: false,
  currentPage: 0,
  events: [],
};
const EventTable = (props: Props) => {
  const { nodeId, expandedRows } = props;
  const [eventDataById, setEventDataById] = useState<IListEventPage>(initEventDetailState);
  const { communicationEvent } = useGlobalStore((state) => ({
    communicationEvent: state.communicationEvent,
  }));
  const [page, setPage] = useState(1);

  const getEvent = (id: string, page?: number) => {
    getEventById(id, page).subscribe({
      next: ({ data }) => {
        setEventDataById(data);
      },
    });
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getEvent(nodeId, page);
  }, [communicationEvent, page]);

  const renderEmptyData = () => {
    return (
      <Box className="p-3">
        <Text align="center">Don&apos;t have data</Text>
      </Box>
    );
  };

  const renderLabel = () => {
    return (
      <thead>
        <tr>
          <th>Send Node</th>
          <th>Timestamp</th>
          <th>File Type</th>
          <th>Receive Node</th>
          <th>Status</th>
        </tr>
      </thead>
    );
  };

  const renderContent = () => {
    const { events } = eventDataById;
    return (
      <tbody>
        {events &&
          events.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.sendNode}</td>
                <td>{dayjs(element.createdAt).format('DD/MM/YYYY')}</td>
                <td>{element.fileType}</td>
                <td>{element.receiveNode}</td>
                <td>{element.status}</td>
              </tr>
            );
          })}
      </tbody>
    );
  };

  const renderDetail = () => {
    return (
      <Box>
        <Table>
          <>
            {renderLabel()}
            {renderContent()}
          </>
        </Table>
        <Pagination
          sx={{ justifyContent: 'flex-end' }}
          page={page}
          total={eventDataById?.totalPage}
          onChange={onPageChange}
        />
      </Box>
    );
  };

  return (
    <Collapse in={expandedRows.includes(nodeId) ? true : false}>
      {eventDataById.totalPage > 0 ? renderDetail() : renderEmptyData()}
    </Collapse>
  );
};
export default EventTable;
