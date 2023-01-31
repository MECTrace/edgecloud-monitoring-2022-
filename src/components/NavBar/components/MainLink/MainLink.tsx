import { NavLink, ThemeIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

const MainLink = (props: MainLinkProps) => {
  const { icon, label, color, path } = props;
  const { t } = useTranslation();

  const location = useLocation();
  return (
    <NavLink
      sx={(theme) => ({
        width: '100%',
        borderRadius: theme.radius.sm,
        padding: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component={Link}
      label={t(label)}
      to={path}
      icon={
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
      }
      active={location.pathname === path}
    />
  );
};

export default MainLink;
