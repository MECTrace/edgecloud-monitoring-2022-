import { ResCert } from '@/interfaces/interfaceCertificate';
import { Grid } from '@mantine/core';
import HeaderCertificateInformation from './CertificateInformation';
import HeaderNodeInformation from './NodeInformation';
import HeaderNodeStatus from './NodeStatus';

type Props = {
  data: ResCert;
};

const MonitorHeader = (props: Props) => {
  const { data } = props;
  const { expiredCertificates, issuedCertificates, serverStatus } = data;
  const certDetail = () => {
    return { issuedCert: issuedCertificates, expiredCert: expiredCertificates, revokeCert: 0 };
  };
  return (
    <Grid>
      <HeaderNodeStatus span={4} serverStatus={serverStatus} />
      <HeaderNodeInformation span={4} />
      <HeaderCertificateInformation span={4} certDetail={certDetail()} />
    </Grid>
  );
};
export default MonitorHeader;
