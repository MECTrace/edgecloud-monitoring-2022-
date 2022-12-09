import { ResOverviewEvent } from '@/interfaces/interfaceListEvent';
import { getOverviewEvent } from '@/services/ListEventAPI';
import useGlobalStore from '@/stores';
import { Box, Card, Grid, Text, Title } from '@mantine/core';
import { ColSpan } from '@mantine/core/lib/Grid/Col/Col.styles';
import { useEffect, useState } from 'react';
type Props = {
  span: ColSpan;
};

const initEventsData = {
  total: 0,
  numberOfFailed: 0,
  numberOfSucceed: 0,
};

const NodeInformation = (props: Partial<Props>) => {
  const { span = 4 } = props;

  const [events, setEvents] = useState<ResOverviewEvent>(initEventsData);
  const { communicationEvent, nodeData } = useGlobalStore((state) => ({
    nodeData: state.nodeData,
    communicationEvent: state.communicationEvent,
  }));

  useEffect(() => {
    getOverviewEvent().subscribe({
      next: ({ data }) => {
        setEvents(data);
      },
    });
  }, [communicationEvent]);

  return (
    <Grid.Col span={span}>
      <Card className="h100">
        <Text>Total Monitor: {nodeData.length}</Text>
        <Box className="d-flex" sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Title align="center">{events?.numberOfSucceed}</Title>
            <Text align="center">Success Data</Text>
          </Box>
          <Box>
            <Title align="center">{events?.numberOfFailed}</Title>
            <Text align="center">Failed Data</Text>
          </Box>
          <Box>
            <Title align="center">{communicationEvent.length}</Title>
            <Text align="center">Progress Data</Text>
          </Box>
        </Box>
      </Card>
    </Grid.Col>
  );
};

export default NodeInformation;
