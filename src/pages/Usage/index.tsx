import {
  TimeSeries,
  UsageStatus,
  VMDetail,
  BarChart,
  PieChart,
  TimeSeriesNetwork,
} from './components';
import { Box, Group, LoadingOverlay, Tabs, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  getCPUByNodeId,
  getDiskByNodeId,
  getNetworkByNodeId,
  getNodeUsage,
  getNumberOfEachKindOfFile,
  getNumberOfFilesTimeSeries,
  getRAMByNodeId,
} from '@/services/UsageAPI';
import { FileSearch, Network, Archive } from 'tabler-icons-react';
import { AxiosResponse } from 'axios';
import EdgeDisable from '@/assets/icons/Edge_disable';

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

export interface RAMDataProps {
  vmName: string;
  ramUsage: number;
  updateAt: string;
}
export interface CPUDataProps {
  vmName: string;
  cpuUsage: number;
  updateAt: string;
}
export interface TimeSeriesNetworkDataProps {
  timeStamp: Date;
  average: number;
}
export interface NetworkDataProps {
  vmName: string;
  totalNetWorkIn: TimeSeriesNetworkDataProps[];
  totalNetWorkOut: TimeSeriesNetworkDataProps[];
  updateAt: string;
}
export interface DiskDataProps {
  vmName: string;
  diskReadOperator: TimeSeriesNetworkDataProps[];
  diskWriteOperator: TimeSeriesNetworkDataProps[];
  updateAt: string;
}

const Usage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [nodeData, setNodeData] = useState<UsageStatusDataProps[]>([]);
  const [timeSeriesData, settimeSeriesData] = useState<TimeSeriesDataProps[]>([]);
  const [timeSeriesDataByNodeId, settimeSeriesDataDataByNodeId] = useState<TimeSeriesDataProps[]>(
    [],
  );
  const [isLoading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<VMDetailDataProps>();
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [fileTypeData, setFileTypeData] = useState<FileTypeDataProps[]>([]);
  const [CPUData, setCPUData] = useState<CPUDataProps>({ cpuUsage: 0 } as CPUDataProps);
  const [RAMData, setRAMData] = useState<RAMDataProps>({ ramUsage: 0 } as RAMDataProps);
  const [networkData, setNetworkData] = useState<NetworkDataProps>({} as NetworkDataProps);
  const [diskData, setDiskData] = useState<DiskDataProps>({} as DiskDataProps);
  const paramAll = 'all';
  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, []);
  useEffect(() => {
    getNodeData();
    gettimeSeriesData();
    getFileTypeData();
  }, []);
  useEffect(() => {
    if (nodeData.length > 0) {
      if (nodeData[0].status == 'On') {
        getRAMData(nodeData[0].id);
        getCPUData(nodeData[0].id);
        getNetworkData(nodeData[0].id);
        getDiskData(nodeData[0].id);
      } else {
        setRAMData({ vmName: nodeData[0].name, ramUsage: 0, updateAt: '' });
        setCPUData({ vmName: nodeData[0].name, cpuUsage: 0, updateAt: '' });
        setNetworkData({} as NetworkDataProps);
        setDiskData({} as DiskDataProps);
      }
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
      if (data.status == 'On') {
        getRAMData(data.id);
        getCPUData(data.id);
        getNetworkData(data.id);
        getDiskData(data.id);
      } else {
        setRAMData({ vmName: data.name, ramUsage: 0, updateAt: '' });
        setCPUData({ vmName: data.name, cpuUsage: 0, updateAt: '' });
        setNetworkData({} as NetworkDataProps);
        setDiskData({} as DiskDataProps);
      }
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
      error() {
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
      error() {
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
      error() {
        setLoading(false);
      },
    });
  };
  const getCPUData = (nodeId: string) => {
    setLoading(true);
    getCPUByNodeId(nodeId).subscribe({
      next: ({ data }: AxiosResponse<any>) => {
        setCPUData(data);
        setLoading(false);
      },
    });
  };
  const getRAMData = (nodeId: string) => {
    setLoading(true);
    getRAMByNodeId(nodeId).subscribe({
      next: ({ data }: AxiosResponse<any>) => {
        setRAMData(data);
        setLoading(false);
      },
    });
  };
  const getNetworkData = (nodeId: string) => {
    setLoading(true);
    getNetworkByNodeId(nodeId).subscribe({
      next: ({ data }: AxiosResponse<any>) => {
        setNetworkData(data);
        setLoading(false);
      },
    });
  };
  const getDiskData = (nodeId: string) => {
    setLoading(true);
    getDiskByNodeId(nodeId).subscribe({
      next: ({ data }: AxiosResponse<any>) => {
        setDiskData(data);
        setLoading(false);
      },
    });
  };
  const onNodeClick = (id: string) => {
    setSelectedNodeId(id);
  };
  return (
    <Box id="usage" sx={{ display: 'flex' }} ref={ref}>
      {/* usage status */}
      <Box className="usagelist" sx={{ marginRight: '1rem' }}>
        <Carousel
          orientation="vertical"
          slideSize="33.333333%"
          sx={{
            maxHeight: window.innerHeight,
            overflow: 'hidden',
            marginBottom: '0.75rem',
            position: 'fixed',
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
                sx={{
                  marginBottom: '0.8rem',
                  border: '2px solid transparent',
                  ...(selectedNodeId === node.id && {
                    borderColor: 'initial',
                    borderRadius: '0.32rem',
                  }),
                }}
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
      <Box ml={0.2 * width} sx={{ maxWidth: width * 0.9, overflowX: 'scroll', height: '100vh' }}>
        {/* VM Detail */}
        <Box className="vmdetail" sx={{ marginBottom: '0.75rem' }}>
          <VMDetail
            data={selectedNode as VMDetailDataProps}
            width={width * 0.78}
            cpu={CPUData.cpuUsage}
            ram={RAMData.ramUsage}
          />
        </Box>
        {/* Time Series */}
        <Box className="timeseries" sx={{ marginBottom: '0.75rem', background: '#FFFFFF' }}>
          <Tabs variant="pills" defaultValue="file">
            <Tabs.List>
              <Tabs.Tab value="file" icon={<FileSearch size={26} />} sx={{ minWidth: '10rem' }}>
                File
              </Tabs.Tab>
              <Tabs.Tab value="network" icon={<Network size={26} />} sx={{ minWidth: '10rem' }}>
                Network
              </Tabs.Tab>
              <Tabs.Tab value="disk" icon={<Archive size={26} />} sx={{ minWidth: '10rem' }}>
                Disk
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="file" pt="xs">
              <TimeSeries
                dataTimeSeriesFirst={timeSeriesData}
                dataTimeSeriesSecond={timeSeriesDataByNodeId}
                tab="file"
                width={width * 0.78}
              />
            </Tabs.Panel>

            <Tabs.Panel value="network" pt="xs">
              {Object.keys(networkData).length != 0 ? (
                <TimeSeriesNetwork
                  dataTimeSeriesFirst={networkData.totalNetWorkIn}
                  dataTimeSeriesSecond={networkData.totalNetWorkOut}
                  tab="network"
                  width={width * 0.78}
                />
              ) : (
                <Box
                  sx={{
                    width: width * 0.78,
                    height: height * 0.2,
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EdgeDisable />
                  <Title order={3}>VM is disable</Title>
                </Box>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="disk" pt="xs">
              {Object.keys(diskData).length != 0 ? (
                <TimeSeriesNetwork
                  dataTimeSeriesFirst={diskData.diskReadOperator}
                  dataTimeSeriesSecond={diskData.diskWriteOperator}
                  tab="disk"
                  width={width * 0.78}
                />
              ) : (
                <Box
                  sx={{
                    width: width * 0.78,
                    height: height * 0.2,
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EdgeDisable />
                  <Title order={3}>VM is disable</Title>
                </Box>
              )}
            </Tabs.Panel>
          </Tabs>
        </Box>
        <Group position="left" mt="md" spacing="xs">
          {/* Pie Chart */}
          <Box className="piechart">
            <PieChart data={fileTypeData} width={width * 0.35} />
          </Box>
          {/* Bart Chart */}
          <Box className="barchart">
            <BarChart data={nodeData} width={width * 0.42} />
          </Box>
        </Group>
      </Box>
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Box>
  );
};

export default Usage;
