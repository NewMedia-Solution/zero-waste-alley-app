import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import logo from '../../../../../assets/images/logo.png'
import { Colors } from '../../../../Constants'
import { ROUTE_NAMES } from '../../../../RouteNames'
import { NavigationService } from '../../../../services/NavigationService'
import { FontFamily } from '../../../../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../../redux/modules/ReduxModuleTypes'

export const MainComponent = () => {
  const dispatch = useDispatch()

  const userName = useSelector<AppState, string | null>(
    (state) => state.User.name
  )

  const isAdmin = useSelector<AppState, boolean>((state) => state.User.isAdmin)

  const onPressScanButton = () => {
    NavigationService.navigate(ROUTE_NAMES.QR_SCAN_SCREEN)
  }

  const onPressAdminScreenButton = () => {
    NavigationService.navigate(ROUTE_NAMES.BUILDING_MANAGEMENT_SCREEN)
  }

  const onPressMyInfoButton = () => {
    NavigationService.navigate(ROUTE_NAMES.MY_INFO_SCREEN)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>{userName ?? '사용자'}님,</Text>
        <Text style={styles.title}>안녕하세요</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.topButtonContainer}>
          <TouchableHighlight
            style={styles.scanButton}
            onPress={onPressScanButton}
            underlayColor={Colors.green2}
          >
            <View style={styles.scanButtonContentContainer}>
              <MaterialCommunityIcons
                name={'qrcode-scan'}
                size={25}
                color={Colors.white}
              />
              <Text style={styles.scanButtonText}>QR 스캔하기</Text>
            </View>
          </TouchableHighlight>
          {isAdmin && (
            <TouchableHighlight
              style={styles.adminScreenButton}
              onPress={onPressAdminScreenButton}
              underlayColor={Colors.blue2}
            >
              <View style={styles.adminScreenButtonContentContainer}>
                <Text style={styles.adminScreenButtonText}>
                  관리자{'\n'}페이지
                </Text>
                <MaterialCommunityIcons
                  name={'account-check'}
                  size={40}
                  color={Colors.white}
                />
              </View>
            </TouchableHighlight>
          )}
        </View>
        <TouchableHighlight
          style={styles.myInfoButton}
          onPress={onPressMyInfoButton}
          underlayColor={Colors.gray2}
        >
          <Text style={styles.myInfoButtonText}>내 정보</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  topContainer: {
    width: '100%',
    marginTop: 20,
  },
  logo: {
    height: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 25,
    lineHeight: 40,
    color: Colors.black,
  },
  bottomContainer: {
    width: '100%',
  },
  topButtonContainer: {
    flexDirection: 'row',
  },
  scanButton: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    borderRadius: 10,
  },
  scanButtonContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanButtonText: {
    marginLeft: 5,
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
  adminScreenButton: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginLeft: 20,
  },
  adminScreenButtonContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminScreenButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
  myInfoButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  myInfoButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.gray3,
  },
})
