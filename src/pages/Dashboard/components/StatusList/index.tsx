import { IStatusConfig } from '@/interfaces/interfaceHierarchyTree';
import { NodeStatusConfig } from '@/config/hierarchyTreeConfig';

import './StatusList.scss';
import { useTranslation } from 'react-i18next';
const StatusList = () => {
  const { t } = useTranslation();

  const renderStatusExplanation = (statusConfig: IStatusConfig[]) =>
    statusConfig.map((eachStatus) => (
      <div key={eachStatus.status} className="d-flex gap-1 align-center">
        <div
          className={`dashboard__status circle note-status--${eachStatus.color} ${
            eachStatus.className || ''
          }`}
        >
          {eachStatus.icon}
        </div>
        <span>{t(eachStatus.label)}</span>
      </div>
    ));

  return (
    <div id="status-list" className="m-3 p-3 position-absolute">
      <div className="d-flex flex-column gap-3 mt-2">
        {renderStatusExplanation(NodeStatusConfig)}
      </div>
    </div>
  );
};

export default StatusList;
