import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { CameraScreen } from 'react-native-camera-kit'
import { appScreen, Colors, FontFamily } from '../../Constants'
import { NavigationService } from '../../services/NavigationService'
import { ROUTE_NAMES } from '../../RouteNames'

const QRScanScreen = () => {
  const [qrCodeValue, setQrCodeValue] = useState('')

  useEffect(() => {
    if (qrCodeValue.length > 0) {
      NavigationService.navigate(ROUTE_NAMES.UNLOCK_SCREEN, {
        qrCode: qrCodeValue,
      })
    }
  }, [qrCodeValue])

  const onPressInputButton = () => {
    NavigationService.navigate(ROUTE_NAMES.QR_CODE_INPUT_SCREEN)
  }

  return (
    <View style={styles.container}>
      <CameraScreen
        scanBarcode={true}
        onReadCode={(event) =>
          setQrCodeValue(event.nativeEvent.codeStringValue ?? '')
        }
      />
      <TouchableHighlight
        style={styles.inputButton}
        onPress={onPressInputButton}
        underlayColor={Colors.green2}
      >
        <Text style={styles.inputButtonText}>직접 입력하기</Text>
      </TouchableHighlight>
    </View>
  )
}

export default QRScanScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputButton: {
    height: 40,
    width: appScreen.width - 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.green,
  },
  inputButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.white,
  },
})
