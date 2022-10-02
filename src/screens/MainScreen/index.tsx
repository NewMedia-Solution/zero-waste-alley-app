import React, { useEffect } from 'react'
import { LoginComponent } from './components/Login'
import { MainComponent } from './components/Main'
import { useSelector } from 'react-redux'
import { NavigationService } from '../../services/NavigationService'
import { ReduxStateProps } from './types'
import { AppState } from '../../redux/modules/ReduxModuleTypes'

const MainScreen = ({ navigation }: any) => {
  useEffect(() => {
    NavigationService.init(navigation)
  }, [])

  const { isLogin } = useSelector<AppState, ReduxStateProps>((state) => ({
    isLogin: state.User.isLogin,
  }))

  return isLogin ? <MainComponent /> : <LoginComponent />
}

export default MainScreen
