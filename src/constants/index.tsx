import { Certificate, Home, AdjustmentsHorizontal } from 'tabler-icons-react';
import { Path } from '@/config/path';

export const SERVER_STATUS = {
  NORMAL: 'normal',
  ERROR: 'error',
  NOT_WORK: 'notWork',
};

export const CERTIFICATE_ISSUE = {
  NONE: 'None',
  NO_CERT: 'No Certificate',
  EXPIRED: 'Certificate Expired',
};

export const MAIN_LINK = [
  { icon: <Home size={16} />, color: 'blue', label: 'Dashboard', path: Path.DASHBOARD },
  {
    icon: <Certificate size={16} />,
    color: 'red',
    label: 'Monitor',
    path: Path.MONITOR,
  },
  {
    icon: <AdjustmentsHorizontal size={16} />,
    color: 'green',
    label: 'Policy',
    path: Path.POLICY,
  },
];

export const TLS_STATUS = [
  {
    status: 'NONE',
    label: 'TLS_COMMUNICATIONS.STATUS.NONE',
    color: '#A6A7AB',
  },
  {
    status: 'TLS',
    label: 'TLS_COMMUNICATIONS.STATUS.TLS',
    color: '#74B816',
  },
  {
    status: 'IMPOSSIBLE',
    label: 'TLS_COMMUNICATIONS.STATUS.IMPOSSIBLE',
    color: '#FAB005',
  },
];
