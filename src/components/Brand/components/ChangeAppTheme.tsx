import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Moon, SunHigh } from 'tabler-icons-react';

const ChangeAppTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
      {colorScheme === 'dark' ? (
        <SunHigh size={16} strokeWidth={2} />
      ) : (
        <Moon size={16} strokeWidth={2} />
      )}
    </ActionIcon>
  );
};

export default ChangeAppTheme;
