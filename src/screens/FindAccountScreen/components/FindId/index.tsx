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
import { useDispatch } from 'react-redux'
import { findId } from '../../../../redux/modules/User'
import { DefaultPopup } from '../../../../components/Popups/DefaultPopup'
import { setIsShowingDefaultPopup } from '../../../../redux/modules/Modal'
import { NavigationService } from '../../../../services/NavigationService'

const FindId = () => {
  const dispatch: any = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [popupMessage, setPopupMessage] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [popupOnPress, setPopupOnPress] = useState(() => () => {})

  const onPressFindIdButton = async () => {
    const { isApiSuccess, id, message } = await dispatch(findId(name, email))

    if (isApiSuccess && id) {
      setPopupMessage(name + '님의 아이디는 ' + id + '입니다.')
      setPopupOnPress(() => () => NavigationService.popToTop())
      dispatch(setIsShowingDefaultPopup())
    } else if (isApiSuccess && message) {
      setPopupMessage(message)
      dispatch(setIsShowingDefaultPopup())
    }
  }

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
      <DefaultPopup content={popupMessage} onPress={popupOnPress} />
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
