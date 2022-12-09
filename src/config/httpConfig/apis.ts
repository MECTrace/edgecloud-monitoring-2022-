export enum APIs {
  GET_NODE_LIST = '/Node/list',
  GET_NODE_DETAIL = '/Node/',
  GET_EVENT_BY_ID = '/event/',
  GET_LIST_EVENT = '/event/search/load-more',
  GET_LIST_EVENT_PAGING = '/event/search/paging',
  GET_ALL_CERTIFICATE = '/certificate/list',
  GET_OVERVIEW_EVENT = '/event/list',
}

export enum ErrorCode {
  ERR = 'ERR',
  ERR_SOCKET = 'ERR_SOCKET',
  ERR_SOCKET_DEVICE_NOTFOUND = 'ERR_SOCKET_DEVICE_NOTFOUND',
  ERR_VIRUS = 'ERR_VIRUS',
  ERR_EXCEED_THRESHOLD = 'ERR_EXCEED_THRESHOLD',
  ERR_NETWORK = 'ERR_NETWORK',
  ERR_CANCELED = 'ERR_CANCELED',
}
