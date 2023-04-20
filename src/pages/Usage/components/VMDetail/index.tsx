import { Box, Title, Text, Group, Progress, ThemeIcon, Image } from '@mantine/core';
import VMInformation from './VMInformation';
import VMUsage from './VMUsage';
import { VMDetailDataProps } from '../..';
import VMIcon from '@/assets/images/icon-vm-deatil.svg';

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
          <Image
            width={'150%'}
            pl={'xs'}
            sx={{ display: 'flex', justifyContent: 'center' }}
            src={VMIcon}
          />
          <VMInformation data={data} />
          <VMUsage width={width} cpu={cpu} ram={ram} />
        </Group>
      </Box>
    </>
  );
};

export default VMDetail;
