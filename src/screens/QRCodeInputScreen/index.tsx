import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { Colors, FontFamily } from '../../Constants'
import { NavigationService } from '../../services/NavigationService'
import { ROUTE_NAMES } from '../../RouteNames'

const QRCodeInputScreen = () => {
  const [qrCode, setQrCode] = useState('')

  const onPressInputButton = () => {
    NavigationService.navigate(ROUTE_NAMES.UNLOCK_SCREEN, {
      qrCode: qrCode,
    })
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} onChangeText={setQrCode} />
      <TouchableHighlight
        style={styles.inputButton}
        underlayColor={Colors.green2}
        onPress={onPressInputButton}
      >
        <Text style={styles.inputButtonText}>입력하기</Text>
      </TouchableHighlight>
    </View>
  )
}

export default QRCodeInputScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  textInput: {
    width: '100%',
    height: 40,
    marginTop: 20,
    padding: 5,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
  },
  inputButton: {
    width: '100%',
    height: 40,
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
