import { AppShell, useMantineTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import CustomNavBar from '../NavBar';
import './PageLayout.scss';

const PageLayout = () => {
  const theme = useMantineTheme();
  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbar={<CustomNavBar />}
      >
        <Outlet />
      </AppShell>
    </>
  );
};

export default PageLayout;
