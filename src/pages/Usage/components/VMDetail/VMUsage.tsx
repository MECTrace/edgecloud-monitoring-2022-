import { Box, Title, Progress } from '@mantine/core';

type Props = {
  width: number;
  cpu: number;
  ram: number;
};

const VMUsage = (props: Props) => {
  const { width, cpu, ram } = props;
  const getColor = (status: number) => {
    if (status == 0) {
      return 'gray';
    } else if (status <= 40) {
      return 'green';
    } else if (status <= 70) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <>
      <Box id="performance" sx={{ marginLeft: '5rem' }}>
        <Title order={5} mb={'md'} mt={'sm'}>
          CPU Usage
        </Title>
        <Progress
          color={getColor(cpu)}
          label={`${Math.round(cpu)}%`}
          size="xl"
          mb={'md'}
          value={cpu == 0 ? 100 : cpu}
          sx={{ width: width * 0.2 }}
        />
        <Title order={5} mb={'md'}>
          RAM
        </Title>
        <Progress
          color={getColor(ram)}
          label={`${Math.round(ram)}%`}
          size="xl"
          mb={'md'}
          value={ram == 0 ? 100 : ram}
          sx={{ width: width * 0.2 }}
        />
      </Box>
    </>
  );
};

export default VMUsage;
