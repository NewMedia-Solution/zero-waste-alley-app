export enum RESIDENT_APPROVAL_STATE {
  WAIT = 'W',
  CONFIRM = 'C',
  REMOVE = 'R',
}

export enum UNLOCK_STATE {
  CHECK_QRCODE = 'check_qrcode',
  SCAN = 'scan',
  CONNECT = 'connect',
  UNLOCK_COMPLETE = 'unlock_complete',
}

export enum BLUETOOTH_COMMAND {
  UNLOCK = 'o',
  LOCK = 'x',
}
