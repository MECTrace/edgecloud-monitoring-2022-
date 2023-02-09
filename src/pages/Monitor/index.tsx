import { ResCert } from '@/interfaces/interfaceCertificate';
import { getAllCertificate } from '@/services/CertificateAPI';
import { Box, LoadingOverlay, Text } from '@mantine/core';
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCertificate();
  }, []);

  const getCertificate = () => {
    setLoading(true);
    getAllCertificate().subscribe({
      next: ({ data }) => {
        setCertificates(data);
        setLoading(false);
      },
    });
  };

  return (
    <Box id="monitor">
      {certificates.certificates.length > 0 ? (
        <>
          <MonitorHeader data={certificates} />
          <CollapseList data={certificates} getCertificate={getCertificate} />
        </>
      ) : (
        <Text align="center">No Data</Text>
      )}
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </Box>
  );
};

export default Monitor;
