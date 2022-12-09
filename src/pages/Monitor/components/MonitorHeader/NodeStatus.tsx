import { IServerStatus } from '@/interfaces/interfaceCertificate';
import { Box, Card, Grid, Title, Text } from '@mantine/core';
import { ColSpan } from '@mantine/core/lib/Grid/Col/Col.styles';
type Props = {
  span: ColSpan;
  serverStatus: IServerStatus;
};

const NodeStatus = (props: Partial<Props>) => {
  const { span = 4, serverStatus } = props;
  return (
    <Grid.Col span={span}>
      <Card
        className="h100 d-flex"
        sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <Box>
          <Box className="nodeStatus d-flex align-center justify-center nodeStatus-red">
            <Title color={'white'} align="center">
              {serverStatus?.notWorkServer}
            </Title>
          </Box>
          <Text align="center" className="pt-2">
            Not Work
          </Text>
        </Box>
        <Box>
          <Box className="nodeStatus d-flex align-center justify-center nodeStatus-yellow">
            <Title align="center" color={'white'}>
              {serverStatus?.errorServer}
            </Title>
          </Box>
          <Text align="center" className="pt-2">
            Error
          </Text>
        </Box>
        <Box>
          <Box className="nodeStatus d-flex align-center justify-center nodeStatus-green">
            <Title align="center" color={'white'}>
              {serverStatus?.normalServer}
            </Title>
          </Box>
          <Text align="center" className="pt-2">
            Normal
          </Text>
        </Box>
      </Card>
    </Grid.Col>
  );
};

export default NodeStatus;
