import React, { useEffect } from 'react'
import { LoginComponent } from './components/Login'
import { MainComponent } from './components/Main'
import { useSelector } from 'react-redux'
import { NavigationiService } from '../../services/NavigationiService'
import { ReduxStateProps } from './types'
import { AppState } from '../../redux/modules/ReduxModuleTypes'

const MainScreen = ({ navigation }: any) => {
  useEffect(() => {
    NavigationiService.init(navigation)
  }, [])

  const { isLogin } = useSelector<AppState, ReduxStateProps>((state) => ({
    isLogin: state.User.isLogin,
  }))

  return isLogin ? <MainComponent /> : <LoginComponent />
}

export default MainScreen
