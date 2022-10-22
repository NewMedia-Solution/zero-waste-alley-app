import { Alert } from 'react-native'
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic'
export class BluetoothService {
  static async getConnectedDevice() {
    return await RNBluetoothClassic.getConnectedDevices()
  }

  static async scan() {
    try {
      return await RNBluetoothClassic.startDiscovery()
    } catch (error: any) {
      Alert.alert('', error.toString())
    }
  }

  static async connect(device: BluetoothDevice) {
    try {
      return await device.connect()
    } catch (error: any) {
      Alert.alert('', error.toString())
    }
  }

  static async disConnect(device: BluetoothDevice) {
    try {
      return await device.disconnect()
    } catch (error: any) {
      Alert.alert('', error.toString())
    }
  }

  static async write(device: BluetoothDevice, value: string) {
    try {
      return await device.write(value)
    } catch (error: any) {
      Alert.alert('', error.toString())
    }
  }
}
