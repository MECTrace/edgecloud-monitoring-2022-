import { ICertificateRes } from '@/interfaces/interfaceCertificate';
import { checkAndUpdateCertificate, deleteCertificate } from '@/services/CertificateAPI';
import { Badge, Box, Button, Group, Menu, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Check, ClearAll } from 'tabler-icons-react';
import EventDetail from './EventDetail';

type Props = {
  data: ICertificateRes;
  serverStatus?: string;
  getCertificate: () => void;
};

const NodeTableContent = (props: Props) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [opened, { close, open }] = useDisclosure(false);

  const { data, serverStatus = 'notWork', getCertificate } = props;
  const { nodeId, name, status, issuedDate, certificateIssue } = data;

  const handleExpandRow = (nodeId: string) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(nodeId);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== nodeId)
      : currentExpandedRows.concat(nodeId);

    setExpandedRows(newExpandedRows);
  };

  const onCheckCertificate = (id: string) => {
    checkAndUpdateCertificate(id).subscribe({
      next: () => {
        getCertificate();
      },
    });
  };

  const onDeleteCertificate = (id: string) => {
    deleteCertificate(id).subscribe({
      next: () => {
        getCertificate();
        close();
      },
    });
  };
  const certificateIssueColor = () => {
    switch (certificateIssue.toUpperCase()) {
      case 'NONE':
        return 'green';
      case 'CERTIFICATE EXPIRED':
        return 'yellow';
      default:
        return 'red';
    }
  };

  return (
    <>
      <tr>
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
        <td>{dayjs(issuedDate).format('DD/MM/YYYY HH:mm:ss')}</td>
        <td>
          <Menu>
            <Menu.Target>
              <UnstyledButton>
                <Badge color={certificateIssueColor()}>{certificateIssue}</Badge>
              </UnstyledButton>
            </Menu.Target>
            {status.toUpperCase() !== 'DOWN' && (
              <Menu.Dropdown>
                <Menu.Item
                  color="green"
                  icon={<Check />}
                  disabled={certificateIssue.toUpperCase() === 'NONE'}
                  onClick={() => {
                    onCheckCertificate(nodeId);
                  }}
                >
                  Check & Update
                </Menu.Item>
                <Menu.Item
                  onClick={open}
                  color="red"
                  icon={<ClearAll />}
                  disabled={certificateIssue.toUpperCase() === 'NO CERTIFICATE'}
                >
                  Delete Certificate
                </Menu.Item>
              </Menu.Dropdown>
            )}

            <Modal opened={opened} onClose={close} size="auto" title="Delete Certificate">
              <Text>Are you sure you want to delete your certificate?</Text>

              <Group mt="xl" position="right">
                <Button onClick={close} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onDeleteCertificate(nodeId);
                  }}
                  color="red"
                >
                  Confirm
                </Button>
              </Group>
            </Modal>
          </Menu>
        </td>
        <td>
          <UnstyledButton
            onClick={() => {
              handleExpandRow(nodeId);
            }}
          >
            <Badge>View Detail</Badge>
          </UnstyledButton>
        </td>
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
