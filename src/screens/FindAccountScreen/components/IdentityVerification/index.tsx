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
import { identityVerification } from '../../../../redux/modules/User'
import { DefaultPopup } from '../../../../components/Popups/DefaultPopup'
import { setIsShowingDefaultPopup } from '../../../../redux/modules/Modal'

const IdentityVerification: React.FC<{
  setIsVerifiedIdentity: (isVerified: boolean) => void
  setVerifiedId: (id: string) => void
}> = ({ setIsVerifiedIdentity, setVerifiedId }) => {
  const dispatch: any = useDispatch()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [popupMessage, setPopupMessage] = useState('')

  const onPressIdentityVerificationButton = async () => {
    const { isApiSuccess, state } = await dispatch(
      identityVerification(id, name, email)
    )

    if (isApiSuccess && state) {
      setVerifiedId(id)
      setIsVerifiedIdentity(true)
    } else if (isApiSuccess && !state) {
      setPopupMessage('본인확인에 실패했습니다.')
      dispatch(setIsShowingDefaultPopup())
    }
  }

  const findIdButtonDisabled = !id || !name || !email

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TitleWithRequiredMark title={'아이디'} />
        <TextInput style={styles.textInput} onChangeText={setId} />
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
        onPress={onPressIdentityVerificationButton}
      >
        <Text style={styles.findIdButtonText}>본인 확인 하기</Text>
      </TouchableHighlight>
      <DefaultPopup content={popupMessage} />
    </View>
  )
}

export default IdentityVerification

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
