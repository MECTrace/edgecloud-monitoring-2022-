import { Box, Title, Text, Group, Progress, ThemeIcon, Image } from '@mantine/core';
import { DevicesPc } from 'tabler-icons-react';
import VMInformation from './VMInformation';
import VMUsage from './VMUsage';
import { VMDetailDataProps } from '../..';
interface VMDetailProps {
  data: VMDetailDataProps;
}

const VMDetail = (props: VMDetailProps) => {
  let { data } = props;
  if (!data) {
    data = {
      id: '',
      status: '',
      name: '',
      nodeURL: '',
    };
  }
  const width = window.innerWidth * 0.58;
  const height = window.innerHeight * 0.2;
  return (
    <>
      <Box sx={{ width: width, height: height * 1.25, background: '#FFFFFF' }}>
        <Group position="center" mt="0" spacing="xs" pt={'1.2%'} grow>
          <Image
            width={'150%'}
            pl={'xs'}
            sx={{ display: 'flex', justifyContent: 'center' }}
            src="src\assets\images\icon-vm-deatil.svg"
          />
          <VMInformation data={data} />
          <VMUsage width={width} />
        </Group>
      </Box>
    </>
  );
};

export default VMDetail;
