import { ICertNumberDetail } from '@/interfaces/interfaceCertificate';
import { Box, Card, Grid, Title, Text } from '@mantine/core';
import { ColSpan } from '@mantine/core/lib/Grid/Col/Col.styles';

type Props = {
  span: ColSpan;
  certDetail: ICertNumberDetail;
};

const CertificateInformation = (props: Props) => {
  const { span = 4, certDetail } = props;
  const { issuedCert = 0, expiredCert = 0, revokeCert = 0 } = certDetail;

  return (
    <Grid.Col span={span}>
      <Card className="h100">
        <Text>Certificate</Text>
        <Box className="d-flex" sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Title align="center">{issuedCert}</Title>
            <Text align="center">Issued Cert</Text>
          </Box>
          <Box>
            <Title align="center">{expiredCert}</Title>
            <Text align="center">Expired Cert</Text>
          </Box>
          <Box>
            <Title align="center">{revokeCert}</Title>
            <Text align="center">Revoke Cert</Text>
          </Box>
        </Box>
      </Card>
    </Grid.Col>
  );
};

export default CertificateInformation;
