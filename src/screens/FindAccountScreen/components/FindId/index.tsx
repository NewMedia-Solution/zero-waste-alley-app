import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { Colors, FontFamily } from '../../../../Constants'
import { TitleWithRequiredMark } from '../../../../components/TitleWithRequiredMark'

const FindId = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const onPressFindIdButton = () => {}

  const findIdButtonDisabled = !name || !email

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TitleWithRequiredMark title={'이름'} />
        <TextInput style={styles.textInput} onChangeText={setName} />
        <TitleWithRequiredMark title={'이메일'} />
        <TextInput style={styles.textInput} onChangeText={setEmail} />
      </View>
      <TouchableHighlight
        style={[
          styles.findIdButton,
          {
            backgroundColor: findIdButtonDisabled ? Colors.gray3 : Colors.green,
          },
        ]}
        underlayColor={Colors.green2}
        disabled={findIdButtonDisabled}
        onPress={onPressFindIdButton}
      >
        <Text style={styles.findIdButtonText}>아이디 찾기</Text>
      </TouchableHighlight>
    </View>
  )
}

export default FindId

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    backgroundColor: Colors.white,
  },
  topContainer: {
    width: '100%',
  },
  textInput: {
    height: 30,
    marginTop: 5,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    textAlignVertical: 'center',
    color: Colors.black,
    padding: 5,
    borderRadius: 4,
    backgroundColor: Colors.lightGray,
  },
  findIdButton: {
    width: '100%',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  findIdButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.white,
  },
})
