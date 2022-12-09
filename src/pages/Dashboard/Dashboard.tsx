import HierarchyTree from '@/components/HierarchyTree';
import { Box } from '@mantine/core';
import StatusList from './components/StatusList';
import './Dashboard.scss';

export const Dashboard = () => {
  return (
    <Box className="dashboard">
      <StatusList />
      <Box className="h100">
        <HierarchyTree hideAttribution={false} />
      </Box>
    </Box>
  );
};
