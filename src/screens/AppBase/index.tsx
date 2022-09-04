import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTE_NAMES } from '../../RouteNames'
import { Routes } from '../../Routes'
import { Colors, FontFamily } from '../../Constants'
import { NavigationOptions } from './types'

const Stack = createNativeStackNavigator()

const navigationOptions: NavigationOptions = (title, isShowing = true) => {
  const isQRScanScreen = title === 'QR 스캔'

  const props = {
    headerTransparent: isQRScanScreen,
    headerShown: isShowing,
  }

  return {
    title: title ?? '',
    headerShadowVisible: false,
    headerTitleStyle: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      color: Colors.black,
    },
    ...props,
  }
}

const AppBase = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTE_NAMES.MAIN_SCREEN}>
        <Stack.Screen
          name={ROUTE_NAMES.MAIN_SCREEN}
          component={Routes.MainScreen}
          options={navigationOptions('', false)}
        />
        <Stack.Screen
          name={ROUTE_NAMES.FIND_ACCOUNT_SCREEN}
          component={Routes.FindAccountScreen}
          options={navigationOptions('정보 찾기')}
        />
        <Stack.Screen
          name={ROUTE_NAMES.SIGN_UP_SCREEN}
          component={Routes.SignUpScreen}
          options={navigationOptions('회원가입')}
        />
        <Stack.Screen
          name={ROUTE_NAMES.MY_INFO_SCREEN}
          component={Routes.MyInfoScreen}
          options={navigationOptions('사용자 정보')}
        />
        <Stack.Screen
          name={ROUTE_NAMES.QR_SCAN_SCREEN}
          component={Routes.QRScanScreen}
          options={navigationOptions('QR 스캔')}
        />
        <Stack.Screen
          name={ROUTE_NAMES.QR_CODE_INPUT_SCREEN}
          component={Routes.QRCodeInputScreen}
          options={navigationOptions('직접 등록')}
        />
        <Stack.Screen
          name={ROUTE_NAMES.BUILDING_MANAGEMENT_SCREEN}
          component={Routes.BuildingManagementScreen}
          options={navigationOptions('관리 건물')}
        />
        <Stack.Screen
          name={ROUTE_NAMES.RESIDENT_MANAGEMENT_SCREEN}
          component={Routes.ResidentManagementScreen}
          options={navigationOptions('거주자 관리')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppBase
