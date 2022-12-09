import { ICertificateRes } from '@/interfaces/interfaceCertificate';
import { Box, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import EventDetail from './EventDetail';

type Props = {
  data: ICertificateRes;
  serverStatus?: string;
};

const NodeTableContent = (props: Props) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const { data, serverStatus = 'notWork' } = props;
  const { nodeId, name, status, issuedDate, certificateIssue } = data;

  const handleExpandRow = (nodeId: string) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(nodeId);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== nodeId)
      : currentExpandedRows.concat(nodeId);

    setExpandedRows(newExpandedRows);
  };

  return (
    <>
      <tr
        onClick={() => {
          handleExpandRow(nodeId);
        }}
      >
        <td>
          <h3>{name}</h3>
          <Text>TLS Communication</Text>
        </td>
        <td>
          <Box className="d-flex">
            <Box className={`serverStatus serverStatus-${serverStatus} mr-1`} />
            {status}
          </Box>
        </td>
        <td>{dayjs(issuedDate).format('DD/MM/YYYY')}</td>
        <td>{certificateIssue}</td>
      </tr>
      <tr>
        <td colSpan={12} className="collapsed">
          <EventDetail nodeId={nodeId} expandedRows={expandedRows} />
        </td>
      </tr>
    </>
  );
};

export default NodeTableContent;
