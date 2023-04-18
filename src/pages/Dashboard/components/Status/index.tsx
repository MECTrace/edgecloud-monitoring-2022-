import { TLS_STATUS } from '@/constants';
import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import './Status.scss';

const Status = () => {
  const { t } = useTranslation();
  return (
    <Box className="status-container">
      {TLS_STATUS.map((status) => {
        return (
          <Group key={status.status} py="xs">
            <Box sx={{ background: status.color, width: 20, height: 20, borderRadius: '50%' }} />
            <Text weight="normal">{t(status.label)}</Text>
          </Group>
        );
      })}
    </Box>
  );
};

export default Status;
