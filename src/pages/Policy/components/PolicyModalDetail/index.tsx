import { IPolicy } from '@/interfaces/interfacePolicy';
import { updatePolicyById, updatePolicyOfNode } from '@/services/PolicyAPI';
import useGlobalStore from '@/stores';
import {
  Box,
  Button,
  Group,
  Input,
  MultiSelect,
  Switch,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';

type PolicyModalDetailProps = {
  data: IPolicy;
  onClose: () => void;
  onSave: () => void;
};

const PolicyModalDetail = (props: PolicyModalDetailProps) => {
  const { data, onClose, onSave } = props;
  const [policy, setPolicy] = useState<IPolicy>(data);

  const { nodeData } = useGlobalStore((state) => ({
    nodeData: state.nodeData,
  }));

  const [nodeSelected, setNodeSelected] = useState<string[]>([]);
  const [listNode, setListNode] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    initNodeData();
  }, []);

  const initNodeData = () => {
    const newState = nodeData.map((item: { id: string; name: string }) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    const newNodeSelected: string[] = data.nodeList.map((item) => {
      return item.nodeId;
    });

    setNodeSelected(newNodeSelected);
    setListNode(newState);
  };

  const {
    id,
    policyName,
    description,
    cpuOverPercent,
    cpuLessThanPercent,
    numberResendNode,
    activated,
  } = policy;

  const updateNode = (nodeId: string[], policyId: string) => {
    try {
      nodeId.length > 0 &&
        nodeId.map((id: string) => {
          updatePolicyOfNode(id, { policyId });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (policyId: string) => {
    updatePolicyById(policyId, policy).subscribe({
      next: () => {
        onSave();
        updateNode(nodeSelected, policyId);
        onClose();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  const onChangeValue = (field: keyof IPolicy, value: string | boolean) => {
    setPolicy({
      ...policy,
      [field]: value,
    });
  };

  const onChangeSelectNode = (value: string[]) => {
    setNodeSelected(value);
  };

  return (
    <Box key={id}>
      <Title align="center">Policy Detail</Title>
      <Group style={{ justifyContent: 'center', marginTop: '-5px' }} my="sm" position="apart">
        <Switch
          label={activated ? 'Activated' : 'Deactivated'}
          checked={activated}
          onChange={(event) => {
            onChangeValue('activated', event.currentTarget.checked);
          }}
        />
      </Group>
      <Group mt="md" align={'flex-start'} my="sm" position="apart">
        <Text>Name:</Text>
        <Input
          onChange={(value) => onChangeValue('policyName', value.target.value)}
          className="modal-input"
          value={policyName || ''}
          placeholder="Input Value"
        />
      </Group>
      <Group align={'flex-start'} my="sm" position="apart">
        <Text>Description:</Text>
        <Textarea
          placeholder="Your description"
          value={description || ''}
          onChange={(value) => onChangeValue('description', value.target.value)}
          className="modal-input"
          minRows={3}
        />
      </Group>
      <Group my="sm" position="apart">
        <Text>CPU Over</Text>
        <Input
          className="modal-input"
          value={cpuOverPercent || ''}
          onChange={(value) => onChangeValue('cpuOverPercent', value.target.value)}
          placeholder="Input Value"
        />
      </Group>
      <Group my="sm" position="apart">
        <Text>CPU Less than:</Text>
        <Input
          className="modal-input"
          value={cpuLessThanPercent || ''}
          onChange={(value) => onChangeValue('cpuLessThanPercent', value.target.value)}
          placeholder="Input Value"
        />
      </Group>
      <Group my="sm" position="apart">
        <Text>Number resend node:</Text>
        <Input
          className="modal-input"
          value={numberResendNode || ''}
          onChange={(value) => onChangeValue('numberResendNode', value.target.value)}
          placeholder="Input Value"
        />
      </Group>
      <Group style={{ width: '100%' }}>
        <MultiSelect
          style={{ width: '100%' }}
          data={listNode}
          value={nodeSelected}
          onChange={onChangeSelectNode}
          label="Select Edges to apply this policy"
          placeholder="Pick all that you like"
          searchable
          nothingFound="Nothing found"
        />
      </Group>
      <Group mt="xl" style={{ justifyContent: 'center' }}>
        <Button color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmit(id);
          }}
        >
          Save
        </Button>
      </Group>
    </Box>
  );
};

export default PolicyModalDetail;
