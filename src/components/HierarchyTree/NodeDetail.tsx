import { IListEventRes } from '@/interfaces/interfaceListEvent';
import { Table } from '@mantine/core';
import dayjs from 'dayjs';

export interface NodeDetailProps {
  node?: IListEventRes[];
}

const NodeDetail = (props: NodeDetailProps) => {
  const { node } = props;
  const rows =
    node &&
    node.map((element) => {
      return (
        <tr key={element.id}>
          <td>{element.sendNode}</td>
          <td>{dayjs(element.createdAt).format('DD/MM/YYYY')}</td>
          <td>{element.fileType}</td>
          <td>{element.receiveNode}</td>
          <td>{element.status}</td>
        </tr>
      );
    });

  return (
    <Table>
      <thead>
        <tr>
          <th>Send Node</th>
          <th>Timestamp</th>
          <th>File Type</th>
          <th>Receive Node</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default NodeDetail;
