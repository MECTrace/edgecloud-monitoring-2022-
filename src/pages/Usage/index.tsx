import { TimeSeries, UsageStatus, VMDetail, BarChart, PieChart } from './components';
import { Box, Group, LoadingOverlay, Tabs } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useEffect, useState } from 'react';
import {
  getNodeUsage,
  getNumberOfEachKindOfFile,
  getNumberOfFilesTimeSeries,
} from '@/services/UsageAPI';
import { FileSearch, Network } from 'tabler-icons-react';

export interface UsageStatusDataProps {
  id: string;
  status: string;
  name: string;
  nodeURL: string;
  total: number;
  lastHours: number;
}
export interface VMDetailDataProps {
  id: string;
  status: string;
  name: string;
  nodeURL: string;
}
export interface TimeSeriesDataProps {
  date: Date;
  total: number;
}
export interface FileTypeDataProps {
  fileType: string;
  total: number;
}

const Usage = () => {
  const [nodeData, setNodeData] = useState<UsageStatusDataProps[]>([]);
  const [timeSeriesData, settimeSeriesData] = useState<TimeSeriesDataProps[]>([]);
  const [timeSeriesDataByNodeId, settimeSeriesDataDataByNodeId] = useState<TimeSeriesDataProps[]>(
    [],
  );
  const [isLoading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<VMDetailDataProps>();
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [fileTypeData, setFileTypeData] = useState<FileTypeDataProps[]>([]);
  const paramAll = 'all';
  useEffect(() => {
    getNodeData();
    gettimeSeriesData();
    getFileTypeData();
  }, []);
  useEffect(() => {
    if (nodeData.length > 0) {
      setSelectedNode({
        id: nodeData[0].id,
        status: nodeData[0].status,
        name: nodeData[0].name,
        nodeURL: nodeData[0].nodeURL,
      });
      setSelectedNodeId(nodeData[0].id);
    }
  }, [nodeData]);

  useEffect(() => {
    const data = nodeData.find((item) => item.id == selectedNodeId);
    if (data) {
      setSelectedNode({
        id: data.id,
        status: data.status,
        name: data.name,
        nodeURL: data.nodeURL,
      });
      gettimeSeriesDataDataByNodeId();
    }
  }, [selectedNodeId]);

  const getNodeData = () => {
    setLoading(true);
    getNodeUsage(paramAll).subscribe({
      next: ({ data }) => {
        setNodeData(data);
        setLoading(false);
      },
    });
  };
  const gettimeSeriesDataDataByNodeId = () => {
    getNumberOfFilesTimeSeries(selectedNodeId, paramAll).subscribe({
      next: ({ data }) => {
        settimeSeriesDataDataByNodeId(data);
      },
    });
  };
  const getFileTypeData = () => {
    setLoading(true);
    getNumberOfEachKindOfFile(paramAll).subscribe({
      next: ({ data }) => {
        setFileTypeData(data);
        setLoading(false);
      },
    });
  };
  const gettimeSeriesData = () => {
    setLoading(true);
    getNumberOfFilesTimeSeries(paramAll, paramAll).subscribe({
      next: ({ data }) => {
        settimeSeriesData(data);
        setLoading(false);
      },
    });
  };
  const onNodeClick = (id: string) => {
    setSelectedNodeId(id);
  };
  return (
    <Box id="usage" sx={{ display: 'flex' }}>
      {/* usage status */}
      <Box className="usagelist" sx={{ marginRight: '1rem' }}>
        <Carousel
          orientation="vertical"
          slideSize="33.333333%"
          sx={{
            maxHeight: window.innerHeight * 1.5,
            overflow: 'hidden',
            marginBottom: '0.75rem',
            position: 'relative',
          }}
          align="start"
          draggable
          dragFree
          controlSize={30}
          breakpoints={[
            { maxWidth: 'md', slideSize: '50%' },
            { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
          ]}
        >
          {nodeData.map((node: UsageStatusDataProps) => {
            const nodeDataItem = { ...node };
            return (
              <Carousel.Slide
                key={node.id}
                id={node.id}
                sx={{ marginBottom: '0.8rem' }}
                onClick={() => onNodeClick(node.id)}
              >
                <UsageStatus
                  key={node.id}
                  id={nodeDataItem.id}
                  status={nodeDataItem.status}
                  name={nodeDataItem.name}
                  nodeURL={nodeDataItem.nodeURL}
                  total={nodeDataItem.total}
                  lastHours={nodeDataItem.lastHours}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Box>
      <Box>
        {/* VM Detail */}
        <Box className="vmdetail" sx={{ marginBottom: '0.75rem' }}>
          <VMDetail data={selectedNode as VMDetailDataProps} />
        </Box>
        {/* Time Series */}
        <Box className="timeseries" sx={{ marginBottom: '0.75rem', background: '#FFFFFF' }}>
          <Tabs variant="pills" defaultValue="file">
            <Tabs.List>
              <Tabs.Tab value="file" icon={<FileSearch size={26} />} sx={{ minWidth: '12rem' }}>
                File
              </Tabs.Tab>
              <Tabs.Tab value="network" icon={<Network size={26} />} sx={{ minWidth: '12rem' }}>
                Network
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="file" pt="xs">
              <TimeSeries
                dataAllNode={timeSeriesData}
                dataSelectedNode={timeSeriesDataByNodeId}
                tab="file"
              />
            </Tabs.Panel>

            <Tabs.Panel value="network" pt="xs">
              <TimeSeries
                dataAllNode={timeSeriesData}
                dataSelectedNode={timeSeriesDataByNodeId}
                tab="network"
              />
            </Tabs.Panel>
          </Tabs>
        </Box>
        <Group position="left" mt="md" spacing="xs">
          {/* Pie Chart */}
          <Box className="piechart">
            <PieChart data={fileTypeData} />
          </Box>
          {/* Bart Chart */}
          <Box className="barchart">
            <BarChart data={nodeData} />
          </Box>
        </Group>
      </Box>
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Box>
  );
};

export default Usage;
