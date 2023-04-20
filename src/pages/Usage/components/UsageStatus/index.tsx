import { Box, Card, Title, Text, Group, Divider, Image } from '@mantine/core';
import { UsageStatusDataProps } from '../..';
import VMIconList from '@/assets/images/icon-vm-list.svg';

const UsageStatus = (props: UsageStatusDataProps) => {
  const { total, lastHours, id, status, name, nodeURL } = props;
  return (
    <>
      <Card sx={{ minWidth: window.innerWidth * 0.15, maxHeight: '12rem' }}>
        <Card.Section
          sx={{
            display: 'flex',
            justifyContent: 'center',
            background: `${status === 'On' ? '#4CAF50' : '#D9D9D9'}`,
            padding: '1rem',
          }}
        >
          <Image width={'40%'} src={VMIconList} />
          <Box sx={{ paddingTop: '0.5rem' }}>
            <Text sx={{ marginBottom: '0.2rem' }} color={'white'}>
              {name}
            </Text>
          </Box>
        </Card.Section>

        <Group position="center" mt="md" spacing="xs">
          <Box>
            <Title order={4} align="center">
              {lastHours}
            </Title>
            <Text weight={350} color={'#B6C5DE'} align="left" size={12}>
              LAST 24 HOURS
            </Text>
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <Title order={4} align="center">
              {total}
            </Title>
            <Text weight={350} color={'#B6C5DE'} align="center" size={12}>
              TOTAL FILES
            </Text>
          </Box>
        </Group>
      </Card>
    </>
  );
};

export default UsageStatus;
