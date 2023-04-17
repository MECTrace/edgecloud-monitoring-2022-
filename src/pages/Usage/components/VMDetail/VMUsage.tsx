import { Box, Title, Text, Group, Progress } from '@mantine/core';

type Props = {
  width: number;
};

const VMUsage = (props: Props) => {
  const { width } = props;
  const CPUUsage = 75;
  const avaiRam = 70;
  return (
    <>
      <Box id="performance" sx={{ marginLeft: '5rem' }}>
        <Title order={5} mb={'md'} mt={'sm'}>
          CPU Usage
        </Title>
        <Progress
          color="green"
          label={`${CPUUsage}%`}
          size="xl"
          mb={'md'}
          value={CPUUsage}
          sx={{ width: width * 0.2 }}
        />
        <Title order={5} mb={'md'}>
          Available RAM
        </Title>
        <Progress
          color="green"
          label={`${avaiRam}%`}
          size="xl"
          mb={'md'}
          value={avaiRam}
          sx={{ width: width * 0.2 }}
        />
      </Box>
    </>
  );
};

export default VMUsage;
