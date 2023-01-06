import { ICertificateRes } from '@/interfaces/interfaceCertificate';
import { deleteCertificate } from '@/services/CertificateAPI';
import { Badge, Box, Button, Group, Menu, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Check, ClearAll } from 'tabler-icons-react';
import EventDetail from './EventDetail';

type Props = {
  data: ICertificateRes;
  serverStatus?: string;
};

const NodeTableContent = (props: Props) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [opened, { close, open }] = useDisclosure(false);

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
        <td>{dayjs(issuedDate).format('DD/MM/YYYY')}</td>
        <td>
          <Badge>{certificateIssue}</Badge>
        </td>
        <td>
          <Menu>
            <Menu.Target>
              <UnstyledButton>
                <Badge color={'red'}>Action</Badge>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item color="green" icon={<Check />}>
                Check & Update
              </Menu.Item>
              <Menu.Item
                onClick={open}
                color="red"
                icon={<ClearAll />}
                disabled={certificateIssue === 'No Certificate'}
              >
                Delete Certificate
              </Menu.Item>
            </Menu.Dropdown>
            <Modal opened={opened} onClose={close} size="auto" title="Delete Certificate">
              <Text>Are you sure you want to delete your certificate?</Text>

              <Group mt="xl" position="right">
                <Button onClick={close} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteCertificate(nodeId).subscribe({
                      next: () => {
                        close();
                      },
                    });
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
          <Button
            onClick={() => {
              handleExpandRow(nodeId);
            }}
          >
            View Detail
          </Button>
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
