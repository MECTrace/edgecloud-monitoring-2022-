export enum APIs {
  GET_NODE_LIST = '/node/list',
  GET_EVENT_BY_ID = '/event/',
  GET_ALL_CERTIFICATE = '/certificate/list',
  CERTIFICATE = '/certificate',
  CHECK_CERTIFICATE = '/certificate/checkAndUpdate',
  GET_OVERVIEW_EVENT = '/event/summary',
  GET_LIST_POLICY = '/policyManager/list',
  GET_LIST_NODE_BY_POLICY = '/policyManager/getListNode/',
  UPDATE_POLICY = '/policy/',
  UPDATE_POLICY_OF_NODE = '/policyManager/',
  GET_NUMBER_OF_FILE = '/event/getNumberOfFilesUpload',
  GET_HISTORICAL_EVENTS = '/event/historical-event/list',
  GET_NODE_USAGE = '/event/getNumberOfFilesOfAllNode/',
  GET_NUMBER_OF_FILE_BY_DAYS = '/event/getNumberOfFilesTimeSeries/',
  GET_NUMBER_OF_EACH_KIND_OF_FILE = '/event/getNumberOfEachKindOfFile/',
  GET_CPU_BY_NODEID = '/node/getCPUByNodeId/',
  GET_RAM_BY_NODEID = '/node/getRAMByNodeId/',
  GET_NETWORK_BY_NODEID = '/node/getTotalNetwork/',
}
