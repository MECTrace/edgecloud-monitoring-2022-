import { INodeByPolicy, IPolicy } from '@/interfaces/interfacePolicy';
import { getListPolicy, updatePolicyById } from '@/services/PolicyAPI';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Group,
  LoadingOverlay,
  Switch,
  Text,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Edit } from 'tabler-icons-react';
import PolicyModal from './components/PolicyModal';
import './Policy.scss';

const initPolicy = {
  id: '',
  policyName: '',
  description: '',
  cpuLessThanPercent: 0,
  cpuOverPercent: 0,
  numberResendNode: 0,
  activated: false,
  nodeList: [],
};

export const Policy = () => {
  const [polices, setPolicies] = useState<IPolicy[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [showModal, toggleModal] = useToggle();
  const [policySelected, setPolicy] = useState<IPolicy>(initPolicy);

  useEffect(() => {
    getPolicies();
  }, []);

  const getPolicies = () => {
    setLoading(true);
    getListPolicy().subscribe({
      next: ({ data }) => {
        setPolicies(data);
        setLoading(false);
      },
    });
  };

  const onChangeValue = (policyId: string, value: boolean) => {
    const policy = {
      activated: value,
    };
    setLoading(true);
    updatePolicyById(policyId, policy).subscribe({
      next: () => {
        getPolicies();
        setLoading(false);
      },
    });
  };

  const onOpenModal = (policy: IPolicy) => {
    toggleModal();
    setPolicy(policy);
  };

  const renderNodeList = (nodeList: INodeByPolicy[]) => {
    return nodeList.map((node: INodeByPolicy) => {
      return (
        <Badge key={node.nodeId}>
          <Text>{node.nodeName}</Text>
        </Badge>
      );
    });
  };

  return (
    <Box style={{ height: '100%' }}>
      {polices.length > 0 ? (
        polices.map((policy) => {
          const {
            id,
            policyName,
            description,
            cpuLessThanPercent,
            cpuOverPercent,
            numberResendNode,
            activated,
            nodeList,
          } = policy;
          return (
            <Box key={id}>
              <Card withBorder={true} className="policy-container" shadow={'sm'}>
                <Card.Section className="item">
                  <Box style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                    <Box>
                      <Group>
                        <Text weight={'bold'} size={20}>
                          {policyName}
                        </Text>
                        <Button
                          onClick={() => onOpenModal(policy)}
                          variant="outline"
                          compact
                          style={{ width: '70px' }}
                          leftIcon={<Edit size={14} />}
                        >
                          Edit
                        </Button>
                      </Group>
                      {description && (
                        <Text
                          style={{ inlineSize: '40vw', overflowWrap: 'break-word' }}
                          italic
                          size={14}
                          className="description"
                        >
                          {description}
                        </Text>
                      )}
                      <Group my="md">{renderNodeList(nodeList)}</Group>
                    </Box>
                  </Box>
                  <Group grow style={{ alignItems: 'center', display: 'flex' }}>
                    <Group>
                      <Text className="text-sm">CPU less than: {cpuLessThanPercent || 0}%</Text>
                    </Group>
                    <Group>
                      <Text className="text-sm">CPU over: {cpuOverPercent || 100}%</Text>
                    </Group>
                    <Group>
                      <Text className="text-sm">Number resend node: {numberResendNode || 0}</Text>
                    </Group>
                    <Switch
                      style={{ display: 'flex' }}
                      label={activated ? 'Activated' : 'Deactivated'}
                      checked={activated}
                      onChange={(event) => onChangeValue(id, event.currentTarget.checked)}
                    />
                  </Group>
                </Card.Section>
              </Card>
            </Box>
          );
        })
      ) : (
        <Center style={{ height: '100%' }}>
          <Text align="center">No Data</Text>
        </Center>
      )}
      <PolicyModal
        onSave={getPolicies}
        visible={showModal}
        onClose={toggleModal}
        policy={policySelected}
      />
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </Box>
  );
};
