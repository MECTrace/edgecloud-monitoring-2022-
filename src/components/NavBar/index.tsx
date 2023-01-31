import { Navbar } from '@mantine/core';
import Brand from '../Brand';
import MainLink from './components/MainLink';

const CustomNavBar = () => {
  return (
    <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow>
        <MainLink />
      </Navbar.Section>
    </Navbar>
  );
};

export default CustomNavBar;
