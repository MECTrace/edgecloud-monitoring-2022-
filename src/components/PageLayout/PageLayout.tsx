import { ReactComponent as LogoDark } from '@/assets/icons/Logo.svg';
import { ReactComponent as Logo } from '@/assets/icons/Logo_dark.svg';
import i18n from '@/config/i18n';
import { Path } from '@/config/path';
import { defaultLanguage } from '@/config/system';
import { Box, Grid, NavLink, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './PageLayout.scss';

export const PageLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [toggleLang, setToggleLang] = useState(
    localStorage.getItem('i18nextLng') || defaultLanguage,
  );

  useEffect(() => {
    i18n.changeLanguage(toggleLang);
  }, [toggleLang]);

  useEffect(() => {
    if (i18n.resolvedLanguage === defaultLanguage && toggleLang !== defaultLanguage) {
      setToggleLang(defaultLanguage);
    }
  }, []);

  return (
    <Grid className="rootLayout">
      <Grid.Col span={2} className="h100 sidebar">
        <Box className="pt-3 mb-3">
          <Link className="header__logo p-3" to={Path.HOMEPAGE}>
            {isDarkMode ? <LogoDark /> : <Logo />}
          </Link>
          <NavLink
            component={Link}
            to={Path.DASHBOARD}
            label="Dashboard"
            active={location.pathname === Path.DASHBOARD}
          />
          <NavLink
            component={Link}
            to={Path.MONITOR}
            label="Monitor"
            active={location.pathname === Path.MONITOR}
          />
        </Box>
      </Grid.Col>
      <Grid.Col span={10} className="h100 outlet p-0">
        <Outlet />
      </Grid.Col>
    </Grid>
  );
};
