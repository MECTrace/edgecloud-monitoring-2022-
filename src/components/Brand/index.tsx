import { ReactComponent as LogoDark } from '@/assets/icons/Logo.svg';
import { ReactComponent as Logo } from '@/assets/icons/Logo_dark.svg';
import { Path } from '@/config/path';
import { Box, Group, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
const Brand = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart">
        <Link to={Path.DASHBOARD}>{isDarkMode ? <LogoDark /> : <Logo />}</Link>
      </Group>
    </Box>
  );
};

export default Brand;
