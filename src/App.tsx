import { ColorScheme, ColorSchemeProvider, LoadingOverlay, MantineProvider } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import 'dayjs/locale/ko';
import { Suspense, useEffect, useId } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import PageLayout from './components/PageLayout';
import { SocketEvents } from './config/httpConfig/socket';
import { mantineTheme } from './config/mantineProvider';
import routesConfig from './config/routesConfig';
import { defaultLanguage } from './config/system';
import { ISocketEvent } from './interfaces/interfaceListEvent';
import { getNodeList } from './services/DashboardAPI';
import useGlobalStore from './stores';

function App() {
  const { socket, setCommunicationEvent, setNodeData, communicationEvent } = useGlobalStore(
    (state) => ({
      socket: state.socket,
      communicationEvent: state.communicationEvent,
      setCommunicationEvent: state.setCommunicationEvent,
      setNodeData: state.setNodeData,
    }),
  );

  const uID = useId();

  const defaultColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: defaultColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    socket.on('connect_error', () => {
      socket.disconnect();
    });

    return () => {
      socket.off('connect_error');
    };
  }, []);

  useEffect(() => {
    getNodeList().subscribe({
      next: ({ data }) => {
        setNodeData(data);
      },
    });
  }, []);

  const updateEvent = (event: ISocketEvent) => {
    const eventList = communicationEvent;
    if (event.status === -1) {
      const clearEvent = eventList.filter((item) => {
        return item.id !== event.id;
      });
      setCommunicationEvent(clearEvent);
    } else {
      const updatedData = eventList.map((item) =>
        item.id === event.id ? { ...item, status: event.status } : item,
      );
      setCommunicationEvent(updatedData);
    }
  };

  const createNewEvent = (event: ISocketEvent) => {
    const newEvent = communicationEvent.concat(event);
    setCommunicationEvent(newEvent);
  };

  useEffect(() => {
    socket.on(SocketEvents.NEW_COMMUNICATION, (event: ISocketEvent) => {
      createNewEvent(event);
    });
    socket.on(SocketEvents.UPDATE_COMMUNICATION, (event: ISocketEvent) => {
      updateEvent(event);
    });

    return () => {
      socket.off(SocketEvents.NEW_COMMUNICATION);
      socket.off(SocketEvents.NEW_COMMUNICATION);
    };
  }, [communicationEvent]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={mantineTheme({
          datesLocale: localStorage.getItem('i18nextLng') || defaultLanguage,
          colorScheme,
        })}
      >
        <NotificationsProvider>
          <Suspense fallback={<LoadingOverlay visible />}>
            <Routes>
              <Route path="/" element={<PageLayout />}>
                {routesConfig.map((route, index) => (
                  <Route key={`${uID}-${index}`} path={route.path} element={<route.component />} />
                ))}
              </Route>
            </Routes>
          </Suspense>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
