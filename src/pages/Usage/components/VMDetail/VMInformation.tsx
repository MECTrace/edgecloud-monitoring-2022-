import { Box, Title, Text, Group } from '@mantine/core';
import { VMDetailDataProps } from '../..';
interface VMInformationProps {
  data: VMDetailDataProps;
}
const VMInformation = (props: VMInformationProps) => {
  const { data } = props;
  return (
    <>
      <Box id="detail">
        <Group position="left" spacing="xl">
          <Title order={5}>VM Name:</Title>
          <Text>{data.name}</Text>
        </Group>
        <Group position="left" spacing="xl" sx={{ minWidth: '30rem' }}>
          <Title order={5}>DNS Name:</Title>
          <Text>
            {data.nodeURL.replace(/^https?:\/\//, '').split('.')[0] +
              '.' +
              data.nodeURL.split('.')[1] +
              '...'}
          </Text>
        </Group>
        <Group position="left" spacing="xl">
          <Title order={5}>Location:</Title>
          <Text>Korea Central</Text>
        </Group>
        <Group position="left" spacing="xl">
          <Title order={5}>Operationg System:</Title>
          <Text>Linux</Text>
        </Group>
        <Group position="left" spacing="xl">
          <Title order={5}>Status:</Title>
          <Text>{data.status}</Text>
        </Group>
      </Box>
    </>
  );
};

export default VMInformation;
