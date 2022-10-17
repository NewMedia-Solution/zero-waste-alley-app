import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { appScreen, Colors } from '../../Constants'
import { NavigationService } from '../../services/NavigationService'
import { FontFamily } from '../../Constants'
import { DaumAddressPopup } from './popups/DaumAddressPopup'
import { useDispatch } from 'react-redux'
import { checkId, signUp } from '../../redux/modules/User'
import { TitleWithRequiredMark } from '../../components/TitleWithRequiredMark'
import { DefaultPopup } from '../../components/Popups/DefaultPopup'
import { setIsShowingDefaultPopup } from '../../redux/modules/Modal'

const SignUpScreen = () => {
  const dispatch: any = useDispatch()

  const [id, setId] = useState('')
  const [isIdValid, setIsIdValid] = useState(false)
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isRetypePasswordValid, setIsRetypePasswordValid] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [zoneCode, setZoneCode] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [unit, setUnit] = useState('')

  const [showDaumAddressPopup, setShowDaumAddressPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [popupOnPress, setPopupOnPress] = useState(() => () => {})

  useEffect(() => {
    setIsIdValid(false)
  }, [id])

  useEffect(() => {
    if (password === retypePassword && retypePassword) {
      setIsRetypePasswordValid(true)
    } else {
      setIsRetypePasswordValid(false)
    }
  }, [password, retypePassword])

  const onPressDoubleCheckButton = async () => {
    const { isApiSuccess, state, message } = await dispatch(checkId(id))

    if (isApiSuccess && state) {
      setIsIdValid(true)
    } else if (isApiSuccess && !state) {
      setPopupMessage(message)
      dispatch(setIsShowingDefaultPopup())
    }
  }

  const onPressAddressSearchButton = () => {
    setShowDaumAddressPopup(true)
  }

  const hidePopup = () => {
    setShowDaumAddressPopup(false)
  }

  const onPressSignUpButton = async () => {
    const { isApiSuccess, state, message } = await dispatch(
      signUp({
        id: id,
        password: password,
        name: name,
        email: email,
        phoneNum: phoneNumber,
        zipCode: zoneCode,
        address1: address,
        address2: detailAddress,
        roomNum: unit,
      })
    )

    if (isApiSuccess && state) {
      setPopupMessage('회원가입에 성공했습니다.')
      setPopupOnPress(() => () => {
        NavigationService.popToTop()
      })
      dispatch(setIsShowingDefaultPopup())
    } else if (isApiSuccess && !state) {
      setPopupMessage(message)
      dispatch(setIsShowingDefaultPopup())
    }
  }

  const signUpButtonDisabled =
    !id ||
    !isIdValid ||
    !password ||
    !retypePassword ||
    !isRetypePasswordValid ||
    !name ||
    !email ||
    !phoneNumber ||
    !address ||
    !detailAddress ||
    !unit

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TitleWithRequiredMark title={'아이디'} />
        <View style={styles.idContainer}>
          <TextInput
            style={[styles.textInput, { width: appScreen.width - 160 }]}
            onChangeText={setId}
          />
          {isIdValid ? (
            <Text style={[styles.comment, { color: Colors.green }]}>
              사용 가능한 아이디입니다.
            </Text>
          ) : (
            <Text style={[styles.comment, { color: Colors.red }]}>
              중복 확인을 진행해주세요.
            </Text>
          )}
          <TouchableHighlight
            style={[
              styles.button,
              { backgroundColor: id ? Colors.blue : Colors.gray3 },
            ]}
            disabled={!id}
            underlayColor={Colors.blue2}
            onPress={onPressDoubleCheckButton}
          >
            <Text style={styles.buttonText}>중복 확인</Text>
          </TouchableHighlight>
        </View>
        <TitleWithRequiredMark title={'패스워드'} />
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TitleWithRequiredMark title={'패스워드 재입력'} />
        <View>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={setRetypePassword}
          />
          {isRetypePasswordValid ? (
            <Text style={[styles.comment, { color: Colors.green }]}>
              패스워드가 일치합니다.
            </Text>
          ) : (
            <Text style={[styles.comment, { color: Colors.red }]}>
              패스워드가 일치하지 않습니다.
            </Text>
          )}
        </View>
        <TitleWithRequiredMark title={'이름'} />
        <TextInput style={styles.textInput} onChangeText={setName} />
        <TitleWithRequiredMark title={'이메일'} />
        <TextInput style={styles.textInput} onChangeText={setEmail} />
        <TitleWithRequiredMark title={'전화번호'} />
        <TextInput style={styles.textInput} onChangeText={setPhoneNumber} />
        <TitleWithRequiredMark title={'주소'} />
        <View style={styles.addressContainer}>
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: Colors.blue }]}
            underlayColor={Colors.blue2}
            onPress={onPressAddressSearchButton}
          >
            <Text style={styles.buttonText}>주소 검색</Text>
          </TouchableHighlight>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={'상세주소'}
          onChangeText={setDetailAddress}
        />
        <TitleWithRequiredMark title={'호수'} />
        <TextInput style={styles.textInput} onChangeText={setUnit} />
      </ScrollView>
      <TouchableHighlight
        style={[
          styles.signUpButton,
          {
            backgroundColor: signUpButtonDisabled ? Colors.gray3 : Colors.green,
          },
        ]}
        disabled={signUpButtonDisabled}
        onPress={onPressSignUpButton}
        underlayColor={Colors.green2}
      >
        <Text style={styles.signUpButtonText}>회원가입 하기</Text>
      </TouchableHighlight>
      <DaumAddressPopup
        isVisible={showDaumAddressPopup}
        setAddress={setAddress}
        setZoneCode={setZoneCode}
        hidePopup={hidePopup}
      />
      <DefaultPopup content={popupMessage} onPress={popupOnPress} />
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: Colors.white,
  },
  textInputTitle: {
    marginTop: 40,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
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
  idContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comment: {
    position: 'absolute',
    top: 36,
    fontFamily: FontFamily.medium,
    fontSize: 12,
  },
  button: {
    marginTop: 5,
    padding: 7,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.white,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    width: appScreen.width - 160,
    height: 30,
    marginTop: 5,
    padding: 5,
    textAlignVertical: 'center',
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.black,
    borderBottomWidth: 1,
    borderColor: Colors.gray3,
  },
  signUpButton: {
    width: '100%',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  signUpButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.white,
  },
})
