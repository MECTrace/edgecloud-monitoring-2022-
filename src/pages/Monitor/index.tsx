import { ResCert } from '@/interfaces/interfaceCertificate';
import { getAllCertificate } from '@/services/CertificateAPI';
import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CollapseList, MonitorHeader } from './components';
import './Monitor.scss';

const initCertState = {
  expiredCertificates: 0,
  certificates: [],
  issuedCertificates: 0,
  serverStatus: {
    errorServer: 0,
    notWorkServer: 0,
    normalServer: 0,
  },
};

const Monitor = () => {
  const [certificates, setCertificates] = useState<ResCert>(initCertState);

  useEffect(() => {
    getCertificate();
  }, []);

  const getCertificate = () => {
    getAllCertificate().subscribe({
      next: ({ data }) => {
        setCertificates(data);
      },
    });
  };

  return (
    <Box id="monitor">
      <MonitorHeader data={certificates} />
      <CollapseList data={certificates} getCertificate={getCertificate} />
    </Box>
  );
};

export default Monitor;
