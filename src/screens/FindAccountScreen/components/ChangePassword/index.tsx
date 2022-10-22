import React, { useEffect, useState } from 'react'
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
import { changePassword } from '../../../../redux/modules/User'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DefaultPopup } from '../../../../components/Popups/DefaultPopup'
import { setIsShowingDefaultPopup } from '../../../../redux/modules/Modal'
import { NavigationService } from '../../../../services/NavigationService'

const ChangePassword: React.FC<{ id: string }> = ({ id }) => {
  const dispatch: any = useDispatch()

  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isRetypePasswordValid, setIsRetypePasswordValid] = useState(false)

  const [popupMessage, setPopupMessage] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [popupOnPress, setPopupOnPress] = useState(() => () => {})

  useEffect(() => {
    if (password === retypePassword && retypePassword) {
      setIsRetypePasswordValid(true)
    } else {
      setIsRetypePasswordValid(false)
    }
  }, [password, retypePassword])

  const onPressChangePasswordButton = async () => {
    const { isApiSuccess, state } = await dispatch(changePassword(id, password))

    if (isApiSuccess && state) {
      setPopupMessage('패스워드 변경에 성공했습니다.')
      setPopupOnPress(() => () => NavigationService.popToTop())
      dispatch(setIsShowingDefaultPopup())
    } else if (isApiSuccess && !state) {
      setPopupMessage('패스워드 변경에 실패했습니다.')
      dispatch(setIsShowingDefaultPopup())
    }
  }

  const changePasswordButtonDisabled =
    !password || !retypePassword || !isRetypePasswordValid

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TitleWithRequiredMark title={'새로운 패스워드'} />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TitleWithRequiredMark title={'새로운 패스워드 재입력'} />
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={setRetypePassword}
            secureTextEntry={true}
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
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons
            name={'information-outline'}
            size={25}
            color={Colors.blue}
          />
          <Text style={styles.infoContent}>
            정보보호를 위해 패스워드 찾기 기능은 지원하지 않고,{'\n'}대신
            패스워드 변경을 권장합니다.
          </Text>
        </View>
      </View>
      <TouchableHighlight
        style={[
          styles.changePasswordButton,
          {
            backgroundColor: changePasswordButtonDisabled
              ? Colors.gray3
              : Colors.green,
          },
        ]}
        underlayColor={Colors.green2}
        disabled={changePasswordButtonDisabled}
        onPress={onPressChangePasswordButton}
      >
        <Text style={styles.changePasswordButtonText}>패스워드 변경하기</Text>
      </TouchableHighlight>
      <DefaultPopup content={popupMessage} onPress={popupOnPress} />
    </View>
  )
}

export default ChangePassword

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
  comment: {
    position: 'absolute',
    top: 36,
    fontFamily: FontFamily.medium,
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.blue,
  },
  infoContent: {
    flexShrink: 1,
    marginLeft: 5,
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.black,
  },
  changePasswordButton: {
    width: '100%',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  changePasswordButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.white,
  },
})
