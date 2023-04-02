import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { appScreen, Colors, FontFamily } from '../../Constants'
import { checkQrCode } from '../../redux/modules/User'
import { useDispatch } from 'react-redux'
import { BluetoothService } from '../../services/BluetoothService'
import { BLUETOOTH_COMMAND, UNLOCK_STATE } from '../../Enums'
import { useNavigationState } from '@react-navigation/native'
import { DefaultPopup } from '../../components/Popups/DefaultPopup'
import { setIsShowingDefaultPopup } from '../../redux/modules/Modal'
import { NavigationService } from '../../services/NavigationService'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BluetoothDevice } from 'react-native-bluetooth-classic'

const UnlockScreen = () => {
  const dispatch: any = useDispatch()

  const qrCode = useNavigationState<any, string>(
    (state) => state.routes?.[state.index]?.params?.qrCode
  )

  const [state, setState] = useState(UNLOCK_STATE.CHECK_QRCODE)
  const [unlockedDevice, setUnlockedDevice] = useState<BluetoothDevice | null>(
    null
  )

  const [popupTitle, setPopupTitle] = useState<string | undefined>(undefined)
  const [popupMessage, setPopupMessage] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [popupOnPress, setPopupOnPress] = useState(() => () => {})

  useEffect(() => {
    checkQrCodeAndStartScan()
  }, [])

  const checkQrCodeAndStartScan = async () => {
    const { isApiSuccess, state } = await dispatch(checkQrCode(qrCode))

    if (isApiSuccess && state) {
      startUnlock()
    } else if (isApiSuccess && !state) {
      showPopup(
        '일치하지 않는 QR 코드입니다.',
        '잠금장치를 해제하지 못했습니다'
      )
    }
  }

  const startUnlock = async () => {
    const granted = await checkPermission()
    if (!granted) {
      showPopup(
        '블루투스 권한을 허용해주세요.',
        '잠금장치를 해제하지 못했습니다'
      )
      return
    }

    setState(UNLOCK_STATE.SCAN)

    const connectedDevice = await BluetoothService.getConnectedDevice()
    if (connectedDevice.length > 0) {
      const isComplete = await bluetoothDisConnect(connectedDevice[0])

      if (!isComplete) {
        showPopup('다시 시도해주세요.', '잠금장치를 해제하지 못했습니다')
      }
    }

    const scannedDevices = await bluetoothScan()
    const scannedDevice = scannedDevices?.find(
      (device) => device.name === 'HC-06'
    )

    if (!scannedDevice) {
      showPopup(
        '쓰레기통 근처로 이동해주세요.',
        '잠금장치를 해제하지 못했습니다'
      )
      return
    }

    setState(UNLOCK_STATE.CONNECT)

    const isConnected = await bluetoothConnect(scannedDevice)

    if (isConnected) {
      const isComplete = await bluetoothWrite(
        scannedDevice,
        BLUETOOTH_COMMAND.UNLOCK
      )

      if (isComplete) {
        setUnlockedDevice(scannedDevice)
        setState(UNLOCK_STATE.UNLOCK_COMPLETE)
      }
    }
  }

  const startLock = async () => {
    if (!unlockedDevice) return

    const isComplete = await bluetoothWrite(
      unlockedDevice,
      BLUETOOTH_COMMAND.LOCK
    )

    if (isComplete) {
      await bluetoothDisConnect(unlockedDevice)

      showPopup('잠금장치 잠금에 성공했습니다.', undefined, () => () => {
        NavigationService.popToTop()
      })
    }
  }

  const showPopup = (
    message: string,
    title: string | undefined,
    onPress?: () => void
  ) => {
    setPopupTitle(title)
    setPopupMessage(message)
    setPopupOnPress(
      onPress ??
        (() => () => {
          NavigationService.pop(1)
        })
    )
    dispatch(setIsShowingDefaultPopup())
  }

  const checkPermission = async () => {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
  }

  const bluetoothScan = async () => {
    return await BluetoothService.scan()
  }

  const bluetoothConnect = async (device: BluetoothDevice) => {
    return await BluetoothService.connect(device)
  }

  const bluetoothDisConnect = async (device: BluetoothDevice) => {
    return await BluetoothService.disConnect(device)
  }

  const bluetoothWrite = async (device: BluetoothDevice, value: string) => {
    return await BluetoothService.write(device, value)
  }

  const renderState = () => {
    let stateText = 'QR 코드 확인 중입니다'

    switch (state) {
      case UNLOCK_STATE.SCAN:
        stateText = '블루투스 스캔 중입니다'
        break
      case UNLOCK_STATE.CONNECT:
        stateText = '블루투스 연결 중입니다'
        break
      case UNLOCK_STATE.UNLOCK_COMPLETE:
        stateText = '잠금해제 되었습니다'
        break
    }

    return <Text style={styles.state}>{stateText}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {state !== UNLOCK_STATE.UNLOCK_COMPLETE && (
          <ActivityIndicator size={'large'} color={Colors.green} />
        )}
        {state === UNLOCK_STATE.UNLOCK_COMPLETE && (
          <MaterialCommunityIcons
            name={'leaf'}
            size={28}
            color={Colors.green}
          />
        )}
        {renderState()}
      </View>
      {state === UNLOCK_STATE.UNLOCK_COMPLETE && (
        <TouchableHighlight
          style={styles.lockButton}
          underlayColor={Colors.green2}
          onPress={startLock}
        >
          <Text style={styles.lockButtonText}>잠금장치 잠그기</Text>
        </TouchableHighlight>
      )}
      <DefaultPopup
        title={popupTitle}
        content={popupMessage}
        onPress={popupOnPress}
      />
    </View>
  )
}

export default UnlockScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  state: {
    marginTop: 20,
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.green,
  },
  lockButton: {
    position: 'absolute',
    bottom: 20,
    height: 40,
    width: appScreen.width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: Colors.green,
  },
  lockButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.white,
  },
})
