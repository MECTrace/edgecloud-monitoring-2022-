import HierarchyTree from '@/components/HierarchyTree';
import { Group } from '@mantine/core';
import Status from './components/Status';

export const Dashboard = () => {
  return (
    <Group sx={{ height: '100%' }} position="apart">
      <HierarchyTree />
      <Status />
    </Group>
  );
};
