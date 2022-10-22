import React, { useEffect, useState } from 'react'
import { NavigationService } from '../../services/NavigationService'
import MyInfo from './components/MyInfo'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, logout, updateUserInfo } from '../../redux/modules/User'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { appScreen, Colors, FontFamily } from '../../Constants'
import { UserInfo } from '../../redux/modules/User/stateTypes'
import { DaumAddressPopup } from '../SignUpScreen/popups/DaumAddressPopup'
import { DefaultPopup } from '../../components/Popups/DefaultPopup'
import { setIsShowingDefaultPopup } from '../../redux/modules/Modal'

const MyInfoScreen = () => {
  const dispatch: any = useDispatch()

  const userInfo = useSelector<any>((state) => ({
    id: state.User.id,
    name: state.User.name,
    phoneNumber: state.User.phoneNumber,
    email: state.User.email,
    address: state.User.address,
    zoneCode: state.User.zoneCode,
    detailAddress: state.User.detailAddress,
    unit: state.User.unit,
  })) as UserInfo

  const [id, setId] = useState(userInfo.id)
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isRetypePasswordValid, setIsRetypePasswordValid] = useState(false)
  const [name, setName] = useState(userInfo.name)
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber)
  const [email, setEmail] = useState(userInfo.email)
  const [address, setAddress] = useState(userInfo.address)
  const [zoneCode, setZoneCode] = useState(userInfo.zoneCode)
  const [detailAddress, setDetailAddress] = useState(userInfo.detailAddress)
  const [unit, setUnit] = useState(userInfo.unit)
  const [isEditing, setIsEditing] = useState(false)

  const [showDaumAddressPopup, setShowDaumAddressPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  useEffect(() => {
    dispatch(getUserInfo(id ?? ''))
  }, [])

  useEffect(() => {
    if (password === retypePassword && retypePassword) {
      setIsRetypePasswordValid(true)
    } else {
      setIsRetypePasswordValid(false)
    }
  }, [password, retypePassword])

  const onPressEditMyInfo = () => {
    setIsEditing(!isEditing)
  }

  const onPressLogoutButton = () => {
    dispatch(logout())

    NavigationService.popToTop()
  }

  const onPressAddressSearchButton = () => {
    setShowDaumAddressPopup(true)
  }

  const hidePopup = () => {
    setShowDaumAddressPopup(false)
  }

  const onPressUpdateMyInfoButton = async () => {
    const { isApiSuccess, state, message } = await dispatch(
      updateUserInfo({
        id: id ?? '',
        password: password,
        name: name ?? '',
        email: email ?? '',
        phoneNum: phoneNumber ?? '',
        zipCode: zoneCode ?? '',
        address1: address ?? '',
        address2: detailAddress ?? '',
        roomNum: unit ?? '',
      })
    )

    if (isApiSuccess && state) {
      dispatch(getUserInfo(id ?? ''))
      setIsEditing(!isEditing)
    } else if (isApiSuccess && !state) {
      setPopupMessage(message)
      dispatch(setIsShowingDefaultPopup())
    }
  }

  const updateButtonDisabled =
    !id ||
    !password ||
    !retypePassword ||
    !isRetypePasswordValid ||
    !name ||
    !email ||
    !phoneNumber ||
    !address ||
    !detailAddress

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.topContainer}>
          {!isEditing ? (
            <>
              <TouchableOpacity
                style={styles.editMyInfoButton}
                onPress={onPressEditMyInfo}
                activeOpacity={0.7}
              >
                <Text style={styles.editMyInfoButtonText}>정보 변경</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressLogoutButton}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutButtonText}>로그아웃</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
        <View style={styles.bottomContainer}>
          <MyInfo
            isEditing={isEditing}
            title={'아이디'}
            data={id}
            onChangeText={setId}
          />
          {isEditing && (
            <>
              <MyInfo
                isEditing={isEditing}
                title={'패스워드'}
                data={password}
                secureTextEntry={true}
                onChangeText={setPassword}
              />
              <View>
                <MyInfo
                  isEditing={isEditing}
                  title={'패스워드 재입력'}
                  data={retypePassword}
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
            </>
          )}
          <MyInfo
            isEditing={isEditing}
            title={'이름'}
            data={name}
            onChangeText={setName}
          />
          <MyInfo
            isEditing={isEditing}
            title={'전화번호'}
            data={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <MyInfo
            isEditing={isEditing}
            title={'이메일'}
            data={email}
            onChangeText={setEmail}
          />
          <MyInfo
            isEditing={false}
            title={'주소'}
            data={address}
            onChangeText={setAddress}
            onPressButton={isEditing ? onPressAddressSearchButton : undefined}
          />
          <MyInfo
            isEditing={isEditing}
            data={detailAddress}
            onChangeText={setDetailAddress}
          />
          <MyInfo
            isEditing={isEditing}
            title={'호수'}
            data={unit}
            onChangeText={setUnit}
          />
        </View>
      </ScrollView>
      {isEditing ? (
        <TouchableHighlight
          style={[
            styles.updateMyInfoButton,
            {
              backgroundColor: updateButtonDisabled
                ? Colors.gray3
                : Colors.green,
            },
          ]}
          disabled={updateButtonDisabled}
          onPress={onPressUpdateMyInfoButton}
          underlayColor={Colors.green2}
        >
          <Text style={styles.updateMyInfoButtonText}>
            사용자 정보 변경하기
          </Text>
        </TouchableHighlight>
      ) : null}
      <DaumAddressPopup
        isVisible={showDaumAddressPopup}
        setAddress={setAddress}
        setZoneCode={setZoneCode}
        hidePopup={hidePopup}
      />
      <DefaultPopup content={popupMessage} />
    </View>
  )
}

export default MyInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  scrollView: {
    width: appScreen.width - 80,
  },
  topContainer: {
    height: 20,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  editMyInfoButton: {
    marginRight: 10,
  },
  editMyInfoButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.gray3,
  },
  logoutButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.gray3,
  },
  comment: {
    position: 'absolute',
    top: 94,
    fontFamily: FontFamily.medium,
    fontSize: 12,
  },
  bottomContainer: {
    width: '100%',
  },
  updateMyInfoButton: {
    width: '100%',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  updateMyInfoButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.white,
  },
})
