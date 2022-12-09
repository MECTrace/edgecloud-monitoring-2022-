import { CERTIFICATE_ISSUE, SERVER_STATUS } from '@/constants';
import { ICertificateRes, ResCert } from '@/interfaces/interfaceCertificate';
import { Box, Card, Table } from '@mantine/core';
import dayjs from 'dayjs';
import NodeTableContent from './NodeTableContent';

type Props = {
  data: ResCert;
};
const CollapseList = (props: Props) => {
  const { data } = props;
  const { certificates } = data;

  const tableLabel = () => {
    return (
      <thead>
        <tr>
          <th>Cloud Name</th>
          <th>Status</th>
          <th>Issue Date</th>
          <th>Certification Issue </th>
        </tr>
      </thead>
    );
  };

  const getServerStatus = (item: ICertificateRes): string => {
    const { expiredDay, certificateIssue } = item;
    const currentDay = new Date();

    if (dayjs(expiredDay) >= dayjs(currentDay) && certificateIssue === CERTIFICATE_ISSUE.NONE)
      return SERVER_STATUS.NORMAL;

    if (dayjs(expiredDay) < dayjs(currentDay) && certificateIssue !== CERTIFICATE_ISSUE.NO_CERT)
      return SERVER_STATUS.ERROR;

    return SERVER_STATUS.NOT_WORK;
  };

  return (
    <Box className="pt-3">
      <Card>
        <Table>
          {tableLabel()}
          <tbody>
            {certificates.map((item: ICertificateRes) => (
              <NodeTableContent key={item.id} data={item} serverStatus={getServerStatus(item)} />
            ))}
          </tbody>
        </Table>
      </Card>
    </Box>
  );
};

export default CollapseList;
