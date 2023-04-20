import { Box, Title, Text, Group, Progress, ThemeIcon, Image } from '@mantine/core';
import VMInformation from './VMInformation';
import VMUsage from './VMUsage';
import { VMDetailDataProps } from '../..';
import EdgeDisable from '@/assets/icons/Edge_disable';
import EdgeOn from '@/assets/icons/Edge_on';
import CloudOn from '@/assets/icons/Cloud_on';
import CloudDisable from '@/assets/icons/Cloud_disable';

interface VMDetailProps {
  data: VMDetailDataProps;
  width: number;
  cpu: number;
  ram: number;
}

const VMDetail = (props: VMDetailProps) => {
  let data = props.data;
  const width = props.width;
  const cpu = props.cpu;
  const ram = props.ram;
  if (!data) {
    data = {
      id: '',
      status: '',
      name: '',
      nodeURL: '',
    };
  }
  const height = window.innerHeight * 0.2;
  return (
    <>
      <Box sx={{ width: width, height: height * 1.25, background: '#FFFFFF' }}>
        <Group position="center" mt="0" spacing="xs" pt={'1.2%'} grow>
          {data.name == 'Cloud Central' ? (
            data.status == 'On' ? (
              <CloudOn />
            ) : (
              <CloudDisable />
            )
          ) : data.status == 'On' ? (
            <EdgeOn />
          ) : (
            <EdgeDisable />
          )}
          <VMInformation data={data} />
          <VMUsage width={width} cpu={cpu} ram={ram} />
        </Group>
      </Box>
    </>
  );
};

export default VMDetail;
