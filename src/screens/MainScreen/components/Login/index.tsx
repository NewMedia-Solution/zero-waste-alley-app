import React, { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import logo from '../../../../../assets/images/logo.png'
import { Colors, FontFamily } from '../../../../Constants'
import { useDispatch } from 'react-redux'
import { NavigationService } from '../../../../services/NavigationService'
import { ROUTE_NAMES } from '../../../../RouteNames'
import { login } from '../../../../redux/modules/User'
import { setIsShowingDefaultPopup } from '../../../../redux/modules/Modal'
import { DefaultPopup } from '../../../../components/Popups/DefaultPopup'

export const LoginComponent = () => {
  const dispatch: any = useDispatch()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const [popupMessage, setPopupMessage] = useState('')

  const onPressLoginButton = async () => {
    const { isApiSuccess, state, message } = await dispatch(login(id, password))

    if (isApiSuccess && !state) {
      setPopupMessage(message)
      dispatch(setIsShowingDefaultPopup())
    }
  }

  const onPressFindIdButton = () => {
    NavigationService.navigate(ROUTE_NAMES.FIND_ACCOUNT_SCREEN, {
      via: 'findId',
    })
  }

  const onPressFindPasswordButton = () => {
    NavigationService.navigate(ROUTE_NAMES.FIND_ACCOUNT_SCREEN, {
      via: 'findPassword',
    })
  }

  const onPressSignUpButton = () => {
    NavigationService.navigate(ROUTE_NAMES.SIGN_UP_SCREEN)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <>
        <View style={styles.topContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.id}
            placeholder={'아이디'}
            placeholderTextColor={Colors.gray2}
            onChangeText={setId}
          />
          <TextInput
            style={styles.password}
            placeholder={'비밀번호'}
            placeholderTextColor={Colors.gray2}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <TouchableHighlight
            style={styles.loginButton}
            onPress={onPressLoginButton}
            underlayColor={Colors.green2}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={onPressFindIdButton}
            activeOpacity={0.7}
          >
            <Text style={styles.bottomButtonText}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.bottomButtonText}>|</Text>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={onPressFindPasswordButton}
            activeOpacity={0.7}
          >
            <Text style={styles.bottomButtonText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.bottomButtonText}>|</Text>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={onPressSignUpButton}
            activeOpacity={0.7}
          >
            <Text style={styles.bottomButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
        <DefaultPopup content={popupMessage} />
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    width: '100%',
  },
  logo: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
  },
  bottomContainer: {
    width: '100%',
  },
  id: {
    width: '100%',
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.black,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: Colors.gray2,
    borderRadius: 10,
  },
  password: {
    width: '100%',
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.black,
    marginTop: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: Colors.gray2,
    borderRadius: 10,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 15,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.green,
  },
  loginButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    letterSpacing: 2,
    color: Colors.white,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  bottomButton: {
    marginHorizontal: 10,
  },
  bottomButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.gray3,
  },
})
